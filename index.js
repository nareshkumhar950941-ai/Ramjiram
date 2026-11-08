const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bigInt = require('big-integer');
const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const API_ID = parseInt(process.env.API_ID || '31266551', 10);
const API_HASH = process.env.API_HASH || 'f2ebfd089cc0958fbedad2088fdc917b';
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAF9mTLdGnio9PhWj6fyHbQ2ZW0zy4IUI8A';
const SESSION_STRING = process.env.SESSION_STRING || '';
const TMDB_API_KEY = process.env.TMDB_KEY || '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_URL = process.env.FIREBASE_URL || 'https://app-seller-8980c-default-rtdb.firebaseio.com';
const APP_URL = process.env.APP_URL || 'https://private-clip-keeper.lovable.app/filmyfly';

const stringSession = new StringSession(SESSION_STRING);
const client = new TelegramClient(stringSession, API_ID, API_HASH, {
  connectionRetries: 5,
});

function getPublicUrl(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/+$/, '');
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN.replace(/\/+$/, '')}`;
  const host = req ? req.get('host') : '';
  if (host && !host.includes('localhost')) {
    return `https://${host}`;
  }
  return '';
}

function cleanTitle(raw) {
  if (!raw) return 'Video';
  let t = raw.replace(/\.[a-zA-Z0-9]{2,4}$/, '');
  t = t.replace(/[._\-+]/g, ' ');
  t = t.replace(/\b(480p|720p|1080p|2160p|4k|hdrip|webrip|web-dl|bluray|x264|x265|hevc|aac|esub)\b/gi, '');
  return t.replace(/\s+/g, ' ').trim() || raw;
}

async function searchTMDB(query) {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
    const res = await axios.get(url, { timeout: 8000 });
    const results = res.data && res.data.results;
    if (results && results.length > 0) {
      const match = results.find(r => r.media_type === 'movie' || r.media_type === 'tv') || results[0];
      return {
        title: match.title || match.name || query,
        overview: match.overview || '',
        poster: match.poster_path ? `https://image.tmdb.org/t/p/w500${match.poster_path}` : '',
        backdrop: match.backdrop_path ? `https://image.tmdb.org/t/p/w1280${match.backdrop_path}` : '',
        rating: match.vote_average || 7.0,
        year: (match.release_date || match.first_air_date || '').split('-')[0] || ''
      };
    }
  } catch (err) {
    console.error('[TMDB] Search error:', err.message);
  }
  return { title: query, overview: '', poster: '', backdrop: '', rating: 7.0, year: '' };
}

async function saveToFirebase(record) {
  try {
    const endpoint = record.type === 'series' ? 'series' : 'movies';
    const res = await axios.post(`${FIREBASE_URL}/${endpoint}.json`, record, { timeout: 8000 });
    return res.data && res.data.name;
  } catch (err) {
    console.error('[Firebase] Save error:', err.message);
    return null;
  }
}

async function handleMtprotoStream(req, res, asDownload) {
  const { chatId, messageId } = req.params;
  const cleanMsgId = parseInt(messageId.replace(/\.(mp4|mkv|webm)$/i, ''), 10);

  if (!client.connected) {
    return res.status(503).send('Telegram MTProto client is connecting, please retry in a few seconds.');
  }

  try {
    let peer = chatId;
    if (!isNaN(chatId)) {
      peer = parseInt(chatId, 10);
    }

    const messages = await client.getMessages(peer, { ids: [cleanMsgId] });
    const msg = messages && messages[0];

    if (!msg || !msg.media) {
      return res.status(404).send('Video not found or deleted from Telegram.');
    }

    const doc = msg.media.document || msg.media;
    const fileSize = doc.size ? Number(doc.size) : 0;
    
    let fileName = `video_${cleanMsgId}.mp4`;
    if (doc.attributes) {
      const fnAttr = doc.attributes.find(a => a.fileName);
      if (fnAttr && fnAttr.fileName) {
        fileName = fnAttr.fileName.replace(/\.mkv$/i, '.mp4');
      }
    }

    const range = req.headers.range;
    const headers = {
      'Accept-Ranges': 'bytes',
      'Content-Type': 'video/mp4',
      'Access-Control-Allow-Origin': '*'
    };

    if (asDownload) {
      headers['Content-Disposition'] = `attachment; filename="${fileName}"`;
    } else {
      headers['Content-Disposition'] = `inline; filename="${fileName}"`;
    }

    let start = 0;
    let end = fileSize ? fileSize - 1 : undefined;

    if (range && fileSize) {
      const parts = range.replace(/bytes=/, '').split('-');
      start = parseInt(parts[0], 10);
      end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      headers['Content-Range'] = `bytes ${start}-${end}/${fileSize}`;
      headers['Content-Length'] = chunkSize;
      res.writeHead(206, headers);
    } else {
      if (fileSize) headers['Content-Length'] = fileSize;
      res.writeHead(200, headers);
    }

    const iter = client.iterDownload({
      file: msg.media,
      offset: bigInt(start),
      limit: end !== undefined ? (end - start + 1) : undefined,
      chunkSize: 512 * 1024
    });

    req.on('close', () => {
      res.end();
    });

    for await (const chunk of iter) {
      if (res.writableEnded) break;
      res.write(chunk);
    }
    res.end();
  } catch (err) {
    console.error('[MTProto Stream Error]:', err.message);
    if (!res.headersSent) {
      res.status(500).send('Streaming error: ' + err.message);
    }
  }
}

app.get('/stream/:chatId/:messageId', (req, res) => handleMtprotoStream(req, res, false));
app.get('/dl/:chatId/:messageId', (req, res) => handleMtprotoStream(req, res, true));

app.get('/watch/:chatId/:messageId', (req, res) => {
  const { chatId, messageId } = req.params;
  const cleanMsgId = messageId.replace(/\.(mp4|mkv|webm)$/i, '');
  const baseUrl = getPublicUrl(req);
  const streamUrl = `${baseUrl}/stream/${chatId}/${cleanMsgId}.mp4`;
  const dlUrl = `${baseUrl}/dl/${chatId}/${cleanMsgId}.mp4`;
  const mxIntent = `intent:${streamUrl}#Intent;package=com.mxtech.videoplayer.ad;type=video/*;end`;
  const vlcIntent = `vlc://${streamUrl}`;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Watch Video - Filmy Fly</title>
      <style>
        body { margin: 0; background: #0b0b0b; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding: 20px; }
        .player-container { width: 100%; max-width: 800px; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
        video { width: 100%; height: auto; display: block; }
        .btn-group { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; width: 100%; max-width: 800px; justify-content: center; }
        .btn { padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px; display: inline-flex; align-items: center; gap: 8px; }
        .btn-dl { background: #e50914; color: #fff; }
        .btn-mx { background: #0084ff; color: #fff; }
        .btn-vlc { background: #ff8800; color: #fff; }
        .note { color: #888; font-size: 13px; margin-top: 15px; text-align: center; max-width: 600px; }
      </style>
    </head>
    <body>
      <h2 style="margin-bottom:15px;">🎬 High-Speed Video Player</h2>
      <div class="player-container">
        <video controls autoplay playsinline src="${streamUrl}"></video>
      </div>
      <div class="btn-group">
        <a href="${dlUrl}" class="btn btn-dl" download>📥 Download MP4</a>
        <a href="${mxIntent}" class="btn btn-mx">📱 Play in MX Player</a>
        <a href="${vlcIntent}" class="btn btn-vlc">📱 Play in VLC</a>
      </div>
      <p class="note">Agar browser mein MKV video/audio na chale, toh "Play in MX Player" ya "Play in VLC" par click karein.</p>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    mtprotoConnected: client.connected
  });
});

async function startBot() {
  if (!BOT_TOKEN) {
    console.error('[Bot Error] BOT_TOKEN environment variable is missing.');
    return;
  }

  try {
    console.log('[MTProto] Connecting client with API_ID and BOT_TOKEN...');
    await client.start({ botAuthToken: BOT_TOKEN });
    console.log('[MTProto] Client connected successfully!');

    client.addEventHandler(async (event) => {
      const message = event.message;
      if (!message) return;

      const media = message.media;
      if (!media) {
        if (message.message === '/start') {
          await client.sendMessage(message.chatId, {
            message: '🎬 Welcome to Filmy Fly MTProto Bot!\n\nKoi bhi badi movie ya video (500MB, 1GB, 2GB+) bhejo. Streaming aur direct download link turant mil jayega.'
          });
        }
        return;
      }

      let rawName = 'Movie';
      if (media.document && media.document.attributes) {
        const fn = media.document.attributes.find(a => a.fileName);
        if (fn && fn.fileName) rawName = fn.fileName;
      }
      if (rawName === 'Movie' && message.message) {
        rawName = message.message;
      }

      const cleanName = cleanTitle(rawName);
      const chatId = message.chatId ? message.chatId.toString() : '';
      const msgId = message.id;

      const statusMsg = await client.sendMessage(message.chatId, {
        message: `⏳ Processing: "${cleanName}"...`
      });

      const meta = await searchTMDB(cleanName);
      const baseUrl = getPublicUrl();

      const streamUrl = baseUrl ? `${baseUrl}/stream/${chatId}/${msgId}.mp4` : '';
      const dlUrl = baseUrl ? `${baseUrl}/dl/${chatId}/${msgId}.mp4` : '';
      const watchUrl = baseUrl ? `${baseUrl}/watch/${chatId}/${msgId}` : `${APP_URL}?title=${encodeURIComponent(meta.title)}`;

      const record = {
        title: meta.title,
        link: streamUrl || watchUrl,
        streamUrl: streamUrl || watchUrl,
        downloadUrl: dlUrl,
        poster: meta.poster,
        backdrop: meta.backdrop,
        rating: meta.rating,
        year: meta.year,
        overview: meta.overview,
        type: rawName.toLowerCase().includes('season') || rawName.toLowerCase().includes('episode') ? 'series' : 'movie',
        createdAt: new Date().toISOString()
      };

      await saveToFirebase(record);

      const buttons = [];
      if (baseUrl) {
        buttons.push([
          new Api.KeyboardButtonUrl({ text: '🎬 Watch Online (.mp4)', url: watchUrl }),
          new Api.KeyboardButtonUrl({ text: '📥 Download (.mp4)', url: dlUrl })
        ]);
        buttons.push([
          new Api.KeyboardButtonUrl({ text: '📱 MX Player', url: `intent:${streamUrl}#Intent;package=com.mxtech.videoplayer.ad;type=video/*;end` }),
          new Api.KeyboardButtonUrl({ text: '📱 VLC Player', url: `vlc://${streamUrl}` })
        ]);
      } else {
        buttons.push([
          new Api.KeyboardButtonUrl({ text: '📱 Open in Filmy Fly App', url: `${APP_URL}?title=${encodeURIComponent(meta.title)}` })
        ]);
      }

      const captionText = `🎬 **${meta.title}** (${meta.year || '2026'})\n⭐ Rating: ${meta.rating}/10\n\n⚡ **2GB+ Unlimited Stream & Download Ready:**`;

      await client.sendMessage(message.chatId, {
        message: captionText,
        buttons: buttons
      });

      await client.deleteMessages(message.chatId, [statusMsg.id], { revoke: true }).catch(() => {});
    }, new NewMessage({}));

  } catch (err) {
    console.error('[MTProto Init Error]:', err.message);
  }
}

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
  startBot();
});
