/**
 * MTProto Telegram Streaming Server & Bot
 * Supports files up to 2GB/4GB with full HTTP Range (fast seek & playback)
 */
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bigInt = require('big-integer');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events/NewMessage');
const { Button } = require('telegram/tl/custom/button');

const API_ID = parseInt(process.env.API_ID || '31266551', 10);
const API_HASH = process.env.API_HASH || 'f2ebfd089cc0958fbedad2088fdc917b';
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAHmZZpVwiWX7-1CsuofBZqhtoQBgymzNHk';
const TMDB_KEY = process.env.TMDB_KEY || '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_URL = process.env.FIREBASE_URL || 'https://app-seller-8980c-default-rtdb.firebaseio.com';
const PORT = process.env.PORT || 8080;

function getBaseUrl() {
  if (process.env.SERVER_URL) return process.env.SERVER_URL.replace(/\/$/, '');
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  return 'https://ramjiram-production-ab75.up.railway.app';
}

const app = express();
app.use(cors());
app.use(express.json());

// Initialize MTProto Client
const client = new TelegramClient(new StringSession(''), API_ID, API_HASH, {
  connectionRetries: 5,
  useWSS: false,
});

function cleanMovieName(raw) {
  if (!raw) return { title: 'Unknown Video', year: null, season: null, episode: null };
  let name = raw.replace(/\.[a-zA-Z0-9]{2,4}$/, '');
  name = name.replace(/[._\-]/g, ' ');

  let season = null, episode = null, year = null;
  const seMatch = name.match(/s(\d{1,2})[.\s_-]*e(\d{1,2})/i);
  if (seMatch) {
    season = parseInt(seMatch[1], 10);
    episode = parseInt(seMatch[2], 10);
    name = name.slice(0, seMatch.index);
  }
  const yearMatch = name.match(/\b(19\d\d|20\d\d)\b/);
  if (yearMatch) {
    year = yearMatch[1];
    name = name.slice(0, yearMatch.index);
  }

  name = name.replace(/\b(480p|720p|1080p|2160p|4k|hdrip|webrip|web-dl|bluray|x264|x265|hevc|aac|esub|hindi|english|dual|audio|mkv|mp4)\b/gi, '');
  const title = name.trim().replace(/\s+/g, ' ') || 'Video';
  return { title, year, season, episode };
}

async function getTmdbInfo(cleanTitle, year) {
  try {
    const q = encodeURIComponent(cleanTitle);
    const yr = year ? `&year=${year}` : '';
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${q}${yr}`;
    const res = await axios.get(url, { timeout: 6000 });
    const match = res.data?.results?.[0];
    if (match) {
      return {
        title: match.title || match.name || cleanTitle,
        poster: match.poster_path ? `https://image.tmdb.org/t/p/w500${match.poster_path}` : null,
        rating: match.vote_average ? match.vote_average.toFixed(1) : '7.0',
        overview: match.overview || '',
      };
    }
  } catch (err) {
    console.error('TMDB lookup failed:', err.message);
  }
  return { title: cleanTitle, poster: null, rating: '7.0', overview: '' };
}

app.get('/', (req, res) => {
  res.send('⚡ MTProto Telegram Streaming Server is Active & Running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', mtproto: client.connected, timestamp: new Date().toISOString() });
});

async function getMessageDocument(chatId, msgId) {
  try {
    const peer = chatId.startsWith('-100') || chatId.startsWith('-') ? chatId : parseInt(chatId, 10);
    const msgs = await client.getMessages(peer, { ids: [parseInt(msgId, 10)] });
    const msg = msgs && msgs[0];
    if (!msg || !msg.media) return null;
    const doc = msg.media.document;
    if (!doc) return null;

    let fileName = 'video.mp4';
    if (doc.attributes) {
      const fileAttr = doc.attributes.find(a => a.className === 'DocumentAttributeFilename');
      if (fileAttr && fileAttr.fileName) fileName = fileAttr.fileName;
    }
    return { doc, fileName, size: Number(doc.size), mimeType: doc.mimeType || 'video/mp4' };
  } catch (e) {
    console.error('Error fetching message document:', e.message);
    return null;
  }
}

app.head('/stream/:chatId/:msgId/:fileName?', async (req, res) => {
  const { chatId, msgId } = req.params;
  const media = await getMessageDocument(chatId, msgId);
  if (!media) return res.status(404).end();

  res.set({
    'Content-Type': media.mimeType,
    'Content-Length': media.size,
    'Accept-Ranges': 'bytes',
    'Content-Disposition': `inline; filename="${encodeURIComponent(media.fileName)}"`
  });
  res.status(200).end();
});

// Byte-Range High Speed MTProto Streamer
app.get('/stream/:chatId/:msgId/:fileName?', async (req, res) => {
  const { chatId, msgId } = req.params;
  const media = await getMessageDocument(chatId, msgId);
  if (!media) return res.status(404).send('Video not found or inaccessible.');

  const totalSize = media.size;
  const mimeType = media.mimeType;
  const CHUNK_BYTES = 512 * 1024; // 512 KB per chunk

  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

    if (start >= totalSize || end >= totalSize) {
      res.set('Content-Range', `bytes */${totalSize}`);
      return res.status(416).send('Requested Range Not Satisfiable');
    }

    const chunkSize = (end - start) + 1;
    const numChunks = Math.ceil(chunkSize / CHUNK_BYTES);

    res.status(206);
    res.set({
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${encodeURIComponent(media.fileName)}"`
    });

    try {
      const stream = client.iterDownload({
        file: media.doc,
        offset: bigInt(start),
        limit: numChunks,
        requestSize: CHUNK_BYTES,
      });

      let bytesSent = 0;
      for await (const chunk of stream) {
        if (res.writableEnded || res.destroyed) break;
        const remaining = chunkSize - bytesSent;
        if (remaining <= 0) break;
        const toSend = chunk.length > remaining ? chunk.slice(0, remaining) : chunk;
        res.write(toSend);
        bytesSent += toSend.length;
      }
      res.end();
    } catch (err) {
      if (!res.headersSent) res.status(500).send('Streaming error: ' + err.message);
    }
  } else {
    res.status(200);
    res.set({
      'Content-Length': totalSize,
      'Accept-Ranges': 'bytes',
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${encodeURIComponent(media.fileName)}"`
    });

    try {
      const stream = client.iterDownload({
        file: media.doc,
        requestSize: CHUNK_BYTES,
      });

      for await (const chunk of stream) {
        if (res.writableEnded || res.destroyed) break;
        res.write(chunk);
      }
      res.end();
    } catch (err) {
      if (!res.headersSent) res.status(500).send('Streaming error: ' + err.message);
    }
  }
});

// Built-in Player Page
app.get('/watch/:chatId/:msgId', async (req, res) => {
  const { chatId, msgId } = req.params;
  const media = await getMessageDocument(chatId, msgId);
  const title = media ? media.fileName : 'Video Stream';
  const streamUrl = `${getBaseUrl()}/stream/${chatId}/${msgId}/${encodeURIComponent(media?.fileName || 'video.mp4')}`;
  const vlcUrl = `vlc://${streamUrl}`;
  const mxUrl = `intent:${streamUrl}#Intent;package=com.mxtech.videoplayer.ad;type=video/*;end`;
  const playitUrl = `playit://playerv2/video?url=${encodeURIComponent(streamUrl)}`;

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding: 15px; }
    h2 { font-size: 1.1rem; text-align: center; margin: 15px 0; word-break: break-word; max-width: 800px; }
    video { width: 100%; max-width: 800px; border-radius: 12px; background: #000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .btn-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; width: 100%; max-width: 800px; margin-top: 15px; }
    .btn { display: flex; align-items: center; justify-content: center; padding: 12px; background: #1e293b; color: #38bdf8; text-decoration: none; border-radius: 8px; font-weight: bold; border: 1px solid #334155; }
    .btn:hover { background: #334155; }
    .btn.dl { background: #0284c7; color: #fff; }
  </style>
</head>
<body>
  <h2>🎬 ${title}</h2>
  <video controls playsinline preload="metadata">
    <source src="${streamUrl}" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>
  <div class="btn-grid">
    <a class="btn dl" href="${streamUrl}" download>📥 Download</a>
    <a class="btn" href="${vlcUrl}">🟠 Open in VLC</a>
    <a class="btn" href="${mxUrl}">🔵 Open in MX Player</a>
    <a class="btn" href="${playitUrl}">▶️ Open in PLAYit</a>
  </div>
</body>
</html>`);
});

// Start Bot
async function startBot() {
  console.log('Connecting to Telegram via MTProto...');
  await client.start({
    botAuthToken: BOT_TOKEN,
  });
  console.log('✅ Connected to MTProto successfully!');

  client.addEventHandler(async (event) => {
    const msg = event.message;
    if (!msg) return;

    const chatId = msg.chatId ? msg.chatId.toString() : (msg.peerId?.userId || msg.peerId?.channelId || '').toString();

    if (msg.message && msg.message.startsWith('/start')) {
      await client.sendMessage(chatId, {
        message: '👋 Welcome to Filmy Fly MTProto Bot!\n\nSend or forward any video (up to 2GB/4GB). I will automatically stream it and upload it to your Lovable app!',
      });
      return;
    }

    if (msg.media && msg.media.document) {
      const doc = msg.media.document;
      let rawName = 'Video';
      if (doc.attributes) {
        const fileAttr = doc.attributes.find(a => a.className === 'DocumentAttributeFilename');
        if (fileAttr && fileAttr.fileName) rawName = fileAttr.fileName;
      }
      if (rawName === 'Video' && msg.message) {
        rawName = msg.message;
      }

      const parsed = cleanMovieName(rawName);
      const tmdb = await getTmdbInfo(parsed.title, parsed.year);

      const streamUrl = `${getBaseUrl()}/stream/${chatId}/${msg.id}/${encodeURIComponent(rawName)}`;
      const watchUrl = `${getBaseUrl()}/watch/${chatId}/${msg.id}`;
      const appPlayUrl = `https://private-clip-keeper.lovable.app/?stream=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(tmdb.title)}${tmdb.poster ? `&poster=${encodeURIComponent(tmdb.poster)}` : ''}`;

      try {
        const payload = {
          title: tmdb.title,
          poster: tmdb.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500',
          streamUrl: streamUrl,
          rating: tmdb.rating,
          overview: tmdb.overview,
          category: parsed.season ? 'Series' : 'Movie',
          season: parsed.season || null,
          episode: parsed.episode || null,
          addedAt: new Date().toISOString()
        };
        const endpoint = parsed.season ? `${FIREBASE_URL}/series.json` : `${FIREBASE_URL}/movies.json`;
        await axios.post(endpoint, payload, { timeout: 5000 });
        console.log(`✅ Saved "${tmdb.title}" to Firebase!`);
      } catch (fErr) {
        console.error('Firebase save error:', fErr.message);
      }

      const replyText = `🎬 **${tmdb.title}**\n\n` +
        `📦 Size: ${(Number(doc.size) / (1024 * 1024)).toFixed(1)} MB\n` +
        `⭐ Rating: ${tmdb.rating}\n\n` +
        `✅ Successfully processed via MTProto! Stream links are ready:`;

      await client.sendMessage(chatId, {
        message: replyText,
        buttons: [
          [Button.url('▶️ Watch on Lovable Site', appPlayUrl)],
          [Button.url('🌐 Open Player Page', watchUrl)],
          [Button.url('📥 Direct Stream / Download', streamUrl)]
        ]
      });
    }
  }, new NewMessage({}));
}

app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running on port ${PORT}`);
  startBot().catch(err => {
    console.error('Failed to start MTProto Bot:', err);
  });
});
    
