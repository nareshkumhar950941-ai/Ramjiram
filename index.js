const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bigInt = require('big-integer');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram/tl');
const { NewMessage } = require('telegram/events');

// ==================== CONFIGURATION ====================
const API_ID = parseInt(process.env.TELEGRAM_API_ID || '31266551', 10);
const API_HASH = process.env.TELEGRAM_API_HASH || 'f2ebfd089cc0958fbedad2088fdc917b';
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAHmZZpVwiWX7-1CsuofBZqhtoQBgymzNHk';
const TMDB_API_KEY = process.env.TMDB_API_KEY || '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_DB_URL = 'https://app-seller-8980c-default-rtdb.firebaseio.com';
const PORT = process.env.PORT || 3000;

function getServerBaseUrl(req) {
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  }
  if (process.env.RAILWAY_STATIC_URL) {
    return `https://${process.env.RAILWAY_STATIC_URL}`;
  }
  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, '');
  }
  if (req && req.headers && req.headers.host) {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    return `${proto}://${req.headers.host}`;
  }
  return 'https://ramjiram-1cg.onrender.com';
}
// ========================================================

const app = express();
app.use(cors());
app.use(express.json());

// In-memory cache for fast file streaming lookup
const fileCache = new Map();
const userSessions = {};

// 1. FRONTEND: Serve static index.html and assets
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize Telegram MTProto Client (GramJS)
const client = new TelegramClient(new StringSession(''), API_ID, API_HASH, {
  connectionRetries: 10,
  useWSS: false,
});

async function initTelegram() {
  try {
    await client.start({
      botAuthToken: BOT_TOKEN,
    });
    console.log('✅ Telegram MTProto Bot successfully connected and authenticated!');
  } catch (err) {
    console.error('❌ Failed to start Telegram MTProto client:', err.message);
  }
}
initTelegram();

// ================= TMDB HELPERS =================
async function searchTMDBMovie(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
  const res = await axios.get(url);
  return res.data.results?.[0] || null;
}

async function getTMDBMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`;
  const res = await axios.get(url);
  const data = res.data;

  const trailerObj = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const trailer = trailerObj ? `https://www.youtube.com/watch?v=${trailerObj.key}` : '';
  const cast = data.credits?.cast?.slice(0, 5).map(c => c.name).join(', ') || '';
  const genre = data.genres?.map(g => g.name).join(', ') || 'Action';

  return {
    title: data.title,
    year: (data.release_date || '').split('-')[0] || '2025',
    rating: (data.vote_average || 7.0).toFixed(1),
    genre: genre,
    poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
    backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : '',
    storyline: data.overview || 'No storyline available.',
    trailer: trailer,
    cast: cast,
    category: 'Bollywood',
    qualityBadge: '1080p Full HD',
    isPremium: false,
    timestamp: Date.now()
  };
}

async function searchTMDBSeries(query) {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
  const res = await axios.get(url);
  return res.data.results?.[0] || null;
}

async function getTMDBSeriesDetails(seriesId) {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`;
  const res = await axios.get(url);
  const data = res.data;

  const trailerObj = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const trailer = trailerObj ? `https://www.youtube.com/watch?v=${trailerObj.key}` : '';
  const cast = data.credits?.cast?.slice(0, 5).map(c => c.name).join(', ') || '';
  const genre = data.genres?.map(g => g.name).join(', ') || 'Drama';

  return {
    title: data.name,
    year: (data.first_air_date || '').split('-')[0] || '2025',
    rating: (data.vote_average || 7.5).toFixed(1),
    genre: genre,
    poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
    backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : '',
    storyline: data.overview || 'No storyline available.',
    trailer: trailer,
    cast: cast,
    category: 'Hollywood',
    qualityBadge: 'HD',
    isPremium: false,
    timestamp: Date.now(),
    episodes: {}
  };
}

// ================= TELEGRAM BOT EVENT HANDLER =================
client.addEventHandler(async (event) => {
  try {
    const msg = event.message;
    if (!msg) return;

    const senderId = msg.senderId ? msg.senderId.toString() : null;
    if (!senderId) return;

    const text = (msg.message || '').trim();

    // 1. /start command
    if (text === '/start') {
      const welcome = `🎬 **Naresh World - 1GB+ Movie & TV Bot**\n\n` +
        `✅ **1GB - 2GB Telegram Video Streaming Enabled!**\n\n` +
        `📌 **कमांड्स:**\n` +
        `1️⃣ \`/movie <नाम>\` - TMDB से मूवी खोजें और अपलोड करें\n` +
        `2️⃣ \`/tv <नाम>\` - TMDB से टीवी शो ऐप में जोड़ें\n` +
        `3️⃣ \`/add_episode <SeriesID> <Season> <Episode>\` - एपिसोड जोड़ें\n` +
        `4️⃣ कोई भी वीडियो भेजें — तुरंत डायरेक्ट 1GB+ स्ट्रीमिंग और वॉच लिंक पाएं!`;
      await client.sendMessage(senderId, { message: welcome });
      return;
    }

    // 2. /movie command
    if (text.startsWith('/movie')) {
      const query = text.replace('/movie', '').trim();
      if (!query) {
        await client.sendMessage(senderId, { message: '❌ कृपया मूवी का नाम लिखें, उदाहरण:\n`/movie Jawan`' });
        return;
      }
      await client.sendMessage(senderId, { message: `🔍 TMDB पर "${query}" खोज रहा हूँ...` });
      const found = await searchTMDBMovie(query);
      if (!found) {
        await client.sendMessage(senderId, { message: `❌ TMDB पर "${query}" मूवी नहीं मिली!` });
        return;
      }
      const details = await getTMDBMovieDetails(found.id);
      userSessions[senderId] = { type: 'movie', data: details };

      const caption = `🎬 **${details.title} (${details.year})**\n` +
        `⭐ Rating: ${details.rating}/10 | 🎭 ${details.genre}\n` +
        `👥 Cast: ${details.cast}\n\n` +
        `👉 **अब इस मूवी की वीडियो फ़ाइल भेजें (1GB+ सपोर्टेड)** या कोई डायरेक्ट वीडियो लिंक भेजें:`;

      if (details.poster) {
        try {
          await client.sendFile(senderId, { file: details.poster, caption });
          return;
        } catch (_) {}
      }
      await client.sendMessage(senderId, { message: caption });
      return;
    }

    // 3. /tv command
    if (text.startsWith('/tv')) {
      const query = text.replace('/tv', '').trim();
      if (!query) {
        await client.sendMessage(senderId, { message: '❌ कृपया टीवी शो का नाम लिखें, उदाहरण:\n`/tv Stranger Things`' });
        return;
      }
      await client.sendMessage(senderId, { message: `🔍 TMDB पर "${query}" खोज रहा हूँ...` });
      const found = await searchTMDBSeries(query);
      if (!found) {
        await client.sendMessage(senderId, { message: `❌ TMDB पर "${query}" शो नहीं मिला!` });
        return;
      }
      const details = await getTMDBSeriesDetails(found.id);
      const fbRes = await axios.post(`${FIREBASE_DB_URL}/webseries.json`, details);
      const seriesId = fbRes.data.name;

      const caption = `✅ **${details.title}** ऐप में सफलतापूर्वक जुड़ गया!\n` +
        `🆔 **Series ID:** \`${seriesId}\`\n\n` +
        `अब एपिसोड जोड़ने के लिए लिखें:\n\`/add_episode ${seriesId} 1 1\``;

      if (details.poster) {
        try {
          await client.sendFile(senderId, { file: details.poster, caption });
          return;
        } catch (_) {}
      }
      await client.sendMessage(senderId, { message: caption });
      return;
    }

    // 4. /add_episode command
    if (text.startsWith('/add_episode')) {
      const parts = text.replace('/add_episode', '').trim().split(/\s+/);
      if (parts.length < 3) {
        await client.sendMessage(senderId, {
          message: '❌ गलत फॉर्मेट! ऐसे लिखें:\n`/add_episode <SeriesID> <Season> <Episode>`\nउदाहरण:\n`/add_episode -P2g69v 1 1`'
        });
        return;
      }
      const [seriesId, season, ep] = parts;
      userSessions[senderId] = {
        type: 'episode',
        seriesId: seriesId.trim(),
        season: parseInt(season, 10),
        episode: parseInt(ep, 10)
      };
      await client.sendMessage(senderId, {
        message: `📺 **Season ${season}, Episode ${ep}** के लिए वीडियो फ़ाइल भेजें (1GB+ सपोर्टेड) या डायरेक्ट लिंक:`
      });
      return;
    }

    // 5. Handling Video or Document (MTProto 1GB+ Support)
    let videoLink = null;
    let watchLink = null;
    let downloadLink = null;
    const media = msg.media;
    if (media && (media.document || media.video)) {
      const doc = media.document;
      if (doc) {
        const docId = doc.id.toString();
        const accessHash = doc.accessHash.toString();
        const fileReferenceHex = doc.fileReference ? doc.fileReference.toString('hex') : '';
        const dcId = doc.dcId;
        const fileSize = Number(doc.size);
        const mimeType = doc.mimeType || 'video/mp4';
        const sizeMB = (fileSize / (1024 * 1024)).toFixed(1);

        // Extract filename if available
        let fileName = 'video.mp4';
        if (doc.attributes) {
          for (const attr of doc.attributes) {
            if (attr.fileName) {
              fileName = attr.fileName;
              break;
            }
          }
        }

        const fileData = {
          id: docId,
          accessHash,
          fileReference: fileReferenceHex,
          dcId,
          size: fileSize,
          mimeType,
          fileName,
          timestamp: Date.now()
        };

        // Save in-memory and Firebase
        fileCache.set(docId, fileData);
        axios.put(`${FIREBASE_DB_URL}/tg_files/${docId}.json`, fileData).catch(() => {});

        const base = getServerBaseUrl();
        videoLink = `${base}/stream/${docId}.mp4`;
        watchLink = `${base}/watch/${docId}`;
        downloadLink = `${base}/stream/${docId}.mp4?dl=1`;

        await client.sendMessage(senderId, {
          message: `⚡ **1GB+ Video Ready!**\n` +
            `📁 Name: **${fileName}**\n` +
            `📦 Size: **${sizeMB} MB**\n\n` +
            `🌐 **Watch Online Player:**\n${watchLink}\n\n` +
            `🔗 **Direct Stream Link (VLC / MX Player):**\n\`${videoLink}\`\n\n` +
            `🚀 **Fast Download Link:**\n\`${downloadLink}\``
        });
      }
    } else if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
      videoLink = text;
    }

    // 6. Complete Session Action
    const session = userSessions[senderId];
    if (videoLink && session) {
      if (session.type === 'movie') {
        await client.sendMessage(senderId, { message: `⏳ ऐप में सेव हो रहा है...` });
        const payload = { ...session.data, link: videoLink };
        await axios.post(`${FIREBASE_DB_URL}/movies.json`, payload);
        delete userSessions[senderId];
        await client.sendMessage(senderId, {
          message: `🎉 **${payload.title}** ऐप में सफलतापूर्वक जुड़ गई!\n\n📱 ऐप खोलें, मूवी अब वीडियो प्लेयर में तुरंत प्ले होगी!`
        });
      } else if (session.type === 'episode') {
        await client.sendMessage(senderId, { message: `⏳ एपिसोड सेव हो रहा है...` });
        const payload = {
          season: session.season,
          episode: session.episode,
          title: `Episode ${session.episode}`,
          thumbnail: '',
          link: videoLink,
          isPremium: false,
          timestamp: Date.now()
        };
        await axios.post(`${FIREBASE_DB_URL}/webseries/${session.seriesId}/episodes.json`, payload);
        delete userSessions[senderId];
        await client.sendMessage(senderId, {
          message: `🎉 **Season ${session.season} Episode ${session.episode}** ऐप में लाइव हो गया!`
        });
      }
    }
  } catch (err) {
    console.error('Error in message handler:', err);
  }
}, new NewMessage({}));

// ================= DEDICATED WATCH ONLINE PAGE =================
app.get('/watch/:fileId', async (req, res) => {
  let fileId = req.params.fileId || '';
  fileId = fileId.replace(/\.mp4$/i, '').trim();

  let fileDoc = fileCache.get(fileId);
  if (!fileDoc) {
    try {
      const fbRes = await axios.get(`${FIREBASE_DB_URL}/tg_files/${fileId}.json`);
      if (fbRes.data) {
        fileDoc = fbRes.data;
        fileCache.set(fileId, fileDoc);
      }
    } catch (_) {}
  }

  const base = getServerBaseUrl(req);
  const streamUrl = `${base}/stream/${fileId}.mp4`;
  const downloadUrl = `${base}/stream/${fileId}.mp4?dl=1`;
  const sizeMB = fileDoc ? (fileDoc.size / (1024 * 1024)).toFixed(1) + ' MB' : '1GB+ Video';
  const fileName = fileDoc?.fileName || `Video_${fileId}.mp4`;

  const mxIntent = `intent:${streamUrl}#Intent;action=android.intent.action.VIEW;type=video/*;package=com.mxtech.videoplayer.ad;end`;
  const vlcIntent = `intent:${streamUrl}#Intent;action=android.intent.action.VIEW;type=video/*;package=org.videolan.vlc;end`;
  const playitIntent = `playit://playerv2/video?url=${encodeURIComponent(streamUrl)}`;

  const html = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName} | Naresh World Player</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #0b0b0f; color: #fff; min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 16px; }
    .container { width: 100%; max-width: 680px; margin-top: 10px; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .logo { font-size: 20px; font-weight: 800; background: linear-gradient(90deg, #e50914, #ffb700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .video-card { background: #14141c; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    video { width: 100%; aspect-ratio: 16/9; background: #000; display: block; }
    .info { padding: 18px; }
    .title { font-size: 16px; font-weight: 700; word-break: break-all; margin-bottom: 8px; }
    .meta { font-size: 13px; color: #8e8e9f; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
    .badge { background: #e50914; color: #fff; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .btn-group { display: flex; flex-direction: column; gap: 12px; }
    .btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 20px; border-radius: 12px; font-size: 15px; font-weight: 600; text-decoration: none; cursor: pointer; transition: transform 0.15s ease; border: none; }
    .btn:active { transform: scale(0.98); }
    .btn-download { background: linear-gradient(135deg, #e50914, #b20710); color: #fff; }
    .btn-vlc { background: linear-gradient(135deg, #ff7700, #e05500); color: #fff; }
    .btn-mx { background: linear-gradient(135deg, #0072ff, #00c6ff); color: #fff; }
    .btn-playit { background: linear-gradient(135deg, #11998e, #38ef7d); color: #fff; }
    .btn-copy { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.15); }
    .tip-box { margin-top: 18px; background: rgba(255,183,0,0.08); border: 1px solid rgba(255,183,0,0.25); border-radius: 12px; padding: 14px; font-size: 13px; color: #ffdb80; line-height: 1.5; }
    .tip-box b { color: #ffb700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">NARESH WORLD STREAM</div>
      <span class="badge"><i class="fas fa-bolt"></i> 1GB+ Ultra Fast</span>
    </div>

    <div class="video-card">
      <video id="player" controls playsinline preload="metadata" src="${streamUrl}"></video>
      <div class="info">
        <div class="title">${fileName}</div>
        <div class="meta">
          <span><i class="fas fa-file-video"></i> ${sizeMB}</span>
          <span><i class="fas fa-server"></i> MTProto Engine</span>
        </div>

        <div class="btn-group">
          <a class="btn btn-download" href="${downloadUrl}">
            <i class="fas fa-download"></i> 🚀 Fast Direct Download
          </a>
          <a class="btn btn-vlc" href="${vlcIntent}">
            <i class="fas fa-play-circle"></i> 🎬 Open in VLC Player (Best for MKV)
          </a>
          <a class="btn btn-mx" href="${mxIntent}">
            <i class="fas fa-play"></i> 🍿 Open in MX Player
          </a>
          <a class="btn btn-playit" href="${playitIntent}">
            <i class="fas fa-film"></i> ▶️ Open in PLAYit
          </a>
          <button class="btn btn-copy" onclick="copyLink()">
            <i class="fas fa-copy"></i> 📋 Copy Stream Link
          </button>
        </div>

        <div class="tip-box">
          <b>💡 स्क्रीन ब्लैक (0:00) आ रही है?</b><br>
          अगर वीडियो MKV फ़ॉर्मेट में है, तो मोबाइल ब्राउज़र उसे डायरेक्ट नहीं चला पाता। ऊपर दिए गए <b>VLC Player</b> या <b>MX Player</b> बटन पर क्लिक करें — वीडियो 1 सेकंड में बिना रुके फुल स्पीड में चलेगा!
        </div>
      </div>
    </div>
  </div>

  <script>
    function copyLink() {
      navigator.clipboard.writeText("${streamUrl}").then(() => {
        alert("✅ स्ट्रीम लिंक कॉपी हो गया!");
      });
    }
  </script>
</body>
</html>`;

  res.send(html);
});

// ================= HIGH-SPEED 1GB+ VIDEO STREAMING ENDPOINT =================
app.all('/stream/:fileId', async (req, res) => {
  let fileId = req.params.fileId || '';
  fileId = fileId.replace(/\.mp4$/i, '').trim();

  try {
    // 1. Try MTProto File cache / Firebase lookup
    let fileDoc = fileCache.get(fileId);
    if (!fileDoc) {
      try {
        const fbRes = await axios.get(`${FIREBASE_DB_URL}/tg_files/${fileId}.json`);
        if (fbRes.data) {
          fileDoc = fbRes.data;
          fileCache.set(fileId, fileDoc);
        }
      } catch (_) {}
    }

    if (fileDoc) {
      const fileSize = Number(fileDoc.size);
      const range = req.headers.range;

      const loc = new Api.InputDocumentFileLocation({
        id: bigInt(fileDoc.id),
        accessHash: bigInt(fileDoc.accessHash),
        fileReference: Buffer.from(fileDoc.fileReference, 'hex'),
        thumbSize: ''
      });

      let start = 0;
      let end = fileSize - 1;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        start = parseInt(parts[0], 10);
        end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      }

      if (start >= fileSize || end >= fileSize) {
        res.status(416).set('Content-Range', `bytes */${fileSize}`).end();
        return;
      }

      const chunkSize = (end - start) + 1;
      const CHUNK_DOWNLOAD_SIZE = 512 * 1024; // 512 KB chunks
      const limit = Math.ceil(chunkSize / CHUNK_DOWNLOAD_SIZE);

      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': fileDoc.mimeType || 'video/mp4',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges',
        'Cache-Control': 'no-cache'
      };

      if (req.query.dl === '1') {
        const safeName = (fileDoc.fileName || `video_${fileId}.mp4`).replace(/["\r\n]/g, '');
        headers['Content-Disposition'] = `attachment; filename="${safeName}"`;
      }

      res.writeHead(range ? 206 : 200, headers);

      // Handle HEAD request immediately without downloading chunks
      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const iter = client.iterDownload({
        file: loc,
        dcId: fileDoc.dcId,
        fileSize: bigInt(fileSize),
        offset: bigInt(start),
        limit: limit,
        chunkSize: CHUNK_DOWNLOAD_SIZE
      });

      let bytesSent = 0;
      let clientClosed = false;
      req.on('close', () => { clientClosed = true; });

      for await (const chunk of iter) {
        if (res.writableEnded || req.destroyed || clientClosed) break;
        const remaining = chunkSize - bytesSent;
        if (remaining <= 0) break;
        if (chunk.length > remaining) {
          res.write(chunk.slice(0, remaining));
          bytesSent += remaining;
          break;
        } else {
          res.write(chunk);
          bytesSent += chunk.length;
        }
      }
      if (!res.writableEnded) res.end();
      return;
    }

    // 2. Fallback to Telegram Bot API getFile (for older bot file IDs)
    const fileRes = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
    const filePath = fileRes.data.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

    const headRes = await axios.head(fileUrl);
    const fileSize = headRes.headers['content-length'];
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': '*'
      };
      if (req.query.dl === '1') {
        headers['Content-Disposition'] = `attachment; filename="video_${fileId}.mp4"`;
      }

      res.writeHead(206, headers);
      if (req.method === 'HEAD') return res.end();

      const stream = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
        headers: { Range: `bytes=${start}-${end}` }
      });
      stream.data.pipe(res);
    } else {
      const headers = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*'
      };
      if (req.query.dl === '1') {
        headers['Content-Disposition'] = `attachment; filename="video_${fileId}.mp4"`;
      }
      res.writeHead(200, headers);
      if (req.method === 'HEAD') return res.end();

      const stream = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream'
      });
      stream.data.pipe(res);
    }
  } catch (error) {
    console.error('Streaming error:', error.message);
    if (!res.headersSent) {
      res.status(500).send(`Streaming error: ${error.message}`);
    }
  }
});

app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/dl/:fileId', (req, res) => res.redirect('/stream/' + req.params.fileId));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 Base URL: ${getServerBaseUrl()}`);
});
