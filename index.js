/**
 * Naresh World - High-Speed Telegram Video Streaming & Auto Uploader
 * Features:
 * - 1GB+ Video Streaming via MTProto / GramJS
 * - Direct Range Requests (HTTP 206 Partial Content) & HEAD support
 * - Fixes "Cannot cast Document to any kind of InputFileLocation"
 * - Auto Movie & TV Series Name / Season / Episode Extraction
 * - TMDB Metadata Enrichment & Auto Poster Matching
 * - Firebase Realtime Database Sync for App
 * - In-Browser Player (/watch/:fileId) with VLC / MX Player intents
 * - Node v24 Crash Protection
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const bigInt = require('big-integer');
const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');

// CRASH PREVENTION HANDLERS
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL Uncaught Exception]:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL Unhandled Rejection]:', reason);
});

// INITIALIZE EXPRESS
const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURATION & CREDENTIALS
const PORT = process.env.PORT || 8080;
const BOT_TOKEN = (process.env.BOT_TOKEN || '8793062384:AAF9mTLdGnio9PhWj6fyHbQ2ZW0zy4IUI8A').trim();
const TMDB_KEY = (process.env.TMDB_KEY || '60826475ab1668347a09ec5f5f22b9e3').trim();
const FIREBASE_DB_URL = (process.env.FIREBASE_DB_URL || 'https://app-seller-8980c-default-rtdb.firebaseio.com').replace(/\/$/, '').trim();
const APP_URL = (process.env.APP_URL || 'https://private-clip-keeper.lovable.app').replace(/\/$/, '').trim();

// MTPROTO CREDENTIALS
const API_ID = parseInt(process.env.API_ID || '31266551', 10);
const API_HASH = (process.env.API_HASH || 'f2ebfd089cc0958fbedad2088fdc917b').trim();

// IN-MEMORY CACHE FOR FAST RETRIEVAL
const fileCache = new Map();
const userSessions = {};

// GET PUBLIC SERVER BASE URL
function getBaseUrl(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, '');
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  if (req && req.headers && req.headers.host) {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    return `${proto}://${req.headers.host}`;
  }
  return `http://localhost:${PORT}`;
}

// MTPROTO CLIENT INITIALIZATION
const stringSession = new StringSession(process.env.TG_SESSION || '');
const client = new TelegramClient(stringSession, API_ID, API_HASH, {
  connectionRetries: 10,
  useWSS: false,
});

let isMtprotoConnected = false;

async function startTelegramClient() {
  try {
    console.log('[MTProto] Connecting to Telegram...');
    await client.start({
      botAuthToken: BOT_TOKEN,
    });
    isMtprotoConnected = true;
    const me = await client.getMe();
    console.log(`[MTProto] Connected successfully as @${me.username || me.firstName}!`);
  } catch (err) {
    console.error('[MTProto Connection Error]:', err.message);
  }
}

// HELPER: CLEAN & PARSE TITLE FROM FILENAME OR CAPTION
function parseMediaTitle(rawText) {
  if (!rawText) return { cleanTitle: 'Untitled Video', isSeries: false, season: 1, episode: 1, year: null };

  let text = rawText
    .replace(/\.[a-zA-Z0-9]{2,4}$/, '') // remove extension
    .replace(/[._\-\+\[\]\(\)\{\}]/g, ' ')
    .replace(/@\w+/g, '') // remove telegram usernames
    .replace(/https?:\/\/\S+/g, '')
    .trim();

  // Detect Series Season & Episode e.g. S01E05 or 1x05 or Season 1 Episode 5
  let season = 1;
  let episode = 1;
  let isSeries = false;

  const sMatch = text.match(/(?:s|season)\s*(\d{1,2})\s*(?:e|ep|episode)\s*(\d{1,3})/i)
    || text.match(/(\d{1,2})x(\d{1,3})/i);

  if (sMatch) {
    isSeries = true;
    season = parseInt(sMatch[1], 10);
    episode = parseInt(sMatch[2], 10);
  } else {
    const epMatch = text.match(/(?:ep|episode)\s*(\d{1,3})/i);
    if (epMatch) {
      isSeries = true;
      episode = parseInt(epMatch[1], 10);
    }
  }

  // Detect 4-digit Year
  let year = null;
  const yearMatch = text.match(/\b(19\d{2}|20\d{2})\b/);
  if (yearMatch) {
    year = yearMatch[1];
  }

  // Remove common video quality keywords to isolate clean title
  const cleanTitle = text
    .replace(/(?:s|season)\s*\d{1,2}\s*(?:e|ep|episode)\s*\d{1,3}/gi, '')
    .replace(/\d{1,2}x\d{1,3}/gi, '')
    .replace(/(?:ep|episode)\s*\d{1,3}/gi, '')
    .replace(/\b(19\d{2}|20\d{2})\b/g, '')
    .replace(/\b(480p|720p|1080p|2160p|4k|hd|fhd|hevc|x264|x265|aac|mp4|mkv|web-dl|bluray|esub|h264|hindi|english)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim() || 'Untitled Video';

  return { cleanTitle, isSeries, season, episode, year };
}

// FETCH METADATA FROM TMDB
async function fetchTMDB(title, isSeries, year) {
  try {
    const type = isSeries ? 'tv' : 'movie';
    let url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_KEY}&query=${encodeURIComponent(title)}`;
    if (year) {
      url += isSeries ? `&first_air_date_year=${year}` : `&year=${year}`;
    }
    const res = await axios.get(url, { timeout: 6000 });
    const results = res.data && res.data.results;
    if (results && results.length > 0) {
      const best = results[0];
      return {
        tmdbId: best.id,
        title: best.title || best.name || title,
        poster: best.poster_path ? `https://image.tmdb.org/t/p/w500${best.poster_path}` : 'https://placehold.co/400x600/1e293b/white?text=No+Poster',
        backdrop: best.backdrop_path ? `https://image.tmdb.org/t/p/w1280${best.backdrop_path}` : '',
        rating: best.vote_average || 7.5,
        year: (best.release_date || best.first_air_date || '').split('-')[0] || year || '2026',
        storyline: best.overview || 'Enjoy watching this high quality video stream!',
      };
    }
  } catch (err) {
    console.warn('[TMDB Search Warning]:', err.message);
  }

  return {
    tmdbId: null,
    title: title,
    poster: 'https://placehold.co/400x600/1e293b/white?text=' + encodeURIComponent(title.slice(0, 20)),
    backdrop: '',
    rating: 7.0,
    year: year || '2026',
    storyline: 'Streamed directly via Telegram Cloud.',
  };
}

// SAVE TO FIREBASE REALTIME DATABASE
async function saveToFirebase(meta, streamUrl, isSeries, season, episode) {
  try {
    if (isSeries) {
      const safeKey = (meta.title || 'Series').toLowerCase().replace(/[^a-z0-9]/g, '-');
      // Create/update series parent
      const seriesPayload = {
        title: meta.title,
        poster: meta.poster,
        rating: meta.rating,
        year: meta.year,
        storyline: meta.storyline,
        updatedAt: Date.now(),
      };
      await axios.put(`${FIREBASE_DB_URL}/webseries/${safeKey}.json`, seriesPayload);

      // Save Episode
      const epPayload = {
        title: `${meta.title} S${season} E${episode}`,
        season: season,
        episode: episode,
        link: streamUrl,
        videoUrl: streamUrl,
        streamUrl: streamUrl,
        thumbnail: meta.poster,
        timestamp: Date.now(),
      };
      const epRes = await axios.post(`${FIREBASE_DB_URL}/webseries/${safeKey}/episodes.json`, epPayload);
      console.log(`[Firebase] Saved episode ${meta.title} S${season}E${episode}`);
      return { type: 'series', id: safeKey, epId: epRes.data.name };
    } else {
      // Save Movie
      const moviePayload = {
        title: meta.title,
        poster: meta.poster,
        rating: meta.rating,
        year: meta.year,
        storyline: meta.storyline,
        link: streamUrl,
        videoUrl: streamUrl,
        streamUrl: streamUrl,
        timestamp: Date.now(),
      };
      const mRes = await axios.post(`${FIREBASE_DB_URL}/movies.json`, moviePayload);
      console.log(`[Firebase] Saved movie: ${meta.title}`);
      return { type: 'movie', id: mRes.data.name };
    }
  } catch (err) {
    console.error('[Firebase Save Error]:', err.message);
    return null;
  }
}

// TELEGRAM NEW MESSAGE LISTENER (MTPROTO BOT)
client.addEventHandler(async (event) => {
  const msg = event.message;
  if (!msg) return;

  const senderId = msg.senderId ? msg.senderId.toString() : null;
  const text = (msg.message || '').trim();

  // START COMMAND
  if (text === '/start') {
    try {
      await client.sendMessage(senderId, {
        message:
          `🎬 *Naresh World High-Speed Video Streamer*

` +
          `बस मुझे कोई भी वीडियो फ़ाइल (1GB+, 2GB+ सपोर्टेड) फ़ॉरवर्ड करें या भेजें!

` +
          `✨ यह बॉट अपने आप:
` +
          `1. वीडियो का नाम, सीजन और एपिसोड पहचान लेगा
` +
          `2. TMDB से पोस्टर व रेटिंग लाएगा
` +
          `3. आपके ऐप में वीडियो लाइव कर देगा
` +
          `4. ऑनलाइन प्लेयर, VLC, MX Player और डायरेक्ट डाउनलोड लिंक देगा!`,
        parseMode: 'markdown',
      });
    } catch (_) {}
    return;
  }

  // PROCESS VIDEO / DOCUMENT
  const media = msg.media;
  if (media && (media.document || media.video)) {
    const doc = media.document;
    if (!doc) return;

    try {
      const statusMsg = await client.sendMessage(senderId, {
        message: '⏳ *वीडियो प्रोसेस हो रहा है...*\n1. फ़ाइल पहचान रहा हूँ\n2. TMDB मेटाडेटा खोज रहा हूँ...',
        parseMode: 'markdown',
      });

      const docId = doc.id.toString();
      const accessHash = doc.accessHash.toString();
      const fileReferenceHex = doc.fileReference ? doc.fileReference.toString('hex') : '';
      const dcId = doc.dcId;
      const fileSize = Number(doc.size);
      const mimeType = doc.mimeType || 'video/mp4';
      const sizeMB = (fileSize / (1024 * 1024)).toFixed(1);

      // Extract filename from attributes
      let fileName = 'video.mp4';
      if (doc.attributes) {
        for (const attr of doc.attributes) {
          if (attr.fileName) {
            fileName = attr.fileName;
            break;
          }
        }
      }

      // 1. Cache Document metadata for streaming
      const fileData = {
        id: docId,
        accessHash: accessHash,
        fileReference: fileReferenceHex,
        dcId: dcId,
        size: fileSize,
        mimeType: mimeType,
        fileName: fileName,
        timestamp: Date.now(),
      };

      fileCache.set(docId, fileData);
      axios.put(`${FIREBASE_DB_URL}/tg_files/${docId}.json`, fileData).catch(() => {});

      // 2. Parse Title & Query TMDB
      const rawTitle = (fileName || msg.message || 'Untitled Video');
      const parsed = parseMediaTitle(rawTitle);
      const meta = await fetchTMDB(parsed.cleanTitle, parsed.isSeries, parsed.year);

      // 3. Generate Public Streaming URLs
      const baseUrl = getBaseUrl();
      const streamUrl = `${baseUrl}/stream/${docId}.mp4`;
      const watchUrl = `${baseUrl}/watch/${docId}`;
      const downloadUrl = `${streamUrl}?dl=1`;
      const appPlayUrl = `${APP_URL}/?stream=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(meta.title)}`;

      // 4. Save to Firebase
      await saveToFirebase(meta, streamUrl, parsed.isSeries, parsed.season, parsed.episode);

      // 5. Send confirmation message with buttons
      const replyText =
        `✅ *वीडियो सफलतापूर्वक प्रोसेस हो गया!*

` +
        `🎬 *शीर्षक:* ${meta.title} (${meta.year})
` +
        (parsed.isSeries ? `📺 *सीजन:* ${parsed.season} | *एपिसोड:* ${parsed.episode}
` : '') +
        `⭐ *रेटिंग:* ${meta.rating} | 📦 *साइज़:* ${sizeMB} MB

` +
        `🌐 *App Link:*
${appPlayUrl}

` +
        `📺 *Watch Online:*
${watchUrl}

` +
        `⚡ *Direct Stream:* \`${streamUrl}\``;

      const buttons = [
        [
          { text: '📱 ऐप में खोलें (App Player)', url: appPlayUrl },
        ],
        [
          { text: '📺 ऑनलाइन देखें (Browser)', url: watchUrl },
          { text: '📥 डाउनलोड करें', url: downloadUrl },
        ],
      ];

      // Convert buttons to GramJS format
      const rows = buttons.map((row) =>
        new Api.KeyboardButtonRow({
          buttons: row.map((b) => new Api.KeyboardButtonUrl({ text: b.text, url: b.url })),
        })
      );

      await client.sendMessage(senderId, {
        message: replyText,
        parseMode: 'markdown',
        buttons: new Api.ReplyInlineMarkup({ rows }),
      });

      // Delete status message
      try {
        await client.deleteMessages(senderId, [statusMsg.id], { revoke: true });
      } catch (_) {}

    } catch (err) {
      console.error('[Bot Video Process Error]:', err);
      await client.sendMessage(senderId, {
        message: `❌ वीडियो प्रोसेस करते समय एरर आया: ${err.message}`,
      }).catch(() => {});
    }
  }
}, new NewMessage({}));

// ================= STREAMING & WATCH ROUTES =================

// ROOT STATUS ROUTE
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Naresh World Streaming Server</title></head>
      <body style="background:#0f172a;color:#f8fafc;font-family:sans-serif;text-align:center;padding:50px;">
        <h1>🚀 Naresh World MTProto Streaming Server is Live!</h1>
        <p>Status: <strong>Running</strong> | MTProto: <strong>${isMtprotoConnected ? 'Connected' : 'Connecting...'}</strong></p>
        <p><a href="${APP_URL}" style="color:#38bdf8;">Open Naresh World Web App</a></p>
      </body>
    </html>
  `);
});

// HEALTH CHECK ROUTE
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mtproto: isMtprotoConnected,
    cachedFiles: fileCache.size,
    timestamp: Date.now(),
  });
});

// HIGH-SPEED 1GB+ STREAMING ROUTE
app.all(['/stream/:fileId', '/stream/:fileId.mp4'], async (req, res) => {
  let rawFileId = req.params.fileId || '';
  rawFileId = rawFileId.replace(/\.mp4$/i, '').trim();

  // 1. Fetch File Metadata from Memory Cache or Firebase
  let fileDoc = fileCache.get(rawFileId);
  if (!fileDoc) {
    try {
      const fbRes = await axios.get(`${FIREBASE_DB_URL}/tg_files/${rawFileId}.json`, { timeout: 4000 });
      if (fbRes.data) {
        fileDoc = fbRes.data;
        fileCache.set(rawFileId, fileDoc);
      }
    } catch (_) {}
  }

  // If document not found, try Telegram Bot API fallback
  if (!fileDoc) {
    return res.status(404).send('Video not found. Please re-send the video to the bot.');
  }

  try {
    const fileSize = Number(fileDoc.size);
    const range = req.headers.range;

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
    const CHUNK_DOWNLOAD_SIZE = 512 * 1024; // 512 KB per request
    const limit = Math.ceil(chunkSize / CHUNK_DOWNLOAD_SIZE);

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': fileDoc.mimeType || 'video/mp4',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges',
      'Cache-Control': 'no-cache',
    };

    if (req.query.dl === '1') {
      const safeName = (fileDoc.fileName || `video_${rawFileId}.mp4`).replace(/[\"\r\n]/g, "");
      headers['Content-Disposition'] = `attachment; filename="${safeName}"`;
    }

    res.writeHead(range ? 206 : 200, headers);

    // Fast return on HEAD request
    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    // FIX: PROPERLY CONSTRUCT InputDocumentFileLocation FOR GRAMJS iterDownload
    const fileReferenceBuffer = Buffer.isBuffer(fileDoc.fileReference)
      ? fileDoc.fileReference
      : Buffer.from(fileDoc.fileReference || '', 'hex');

    const fileLocation = new Api.InputDocumentFileLocation({
      id: bigInt(fileDoc.id),
      accessHash: bigInt(fileDoc.accessHash),
      fileReference: fileReferenceBuffer,
      thumbSize: '',
    });

    const iter = client.iterDownload({
      file: fileLocation,
      dcId: fileDoc.dcId,
      fileSize: bigInt(fileSize),
      offset: bigInt(start),
      limit: limit,
      chunkSize: CHUNK_DOWNLOAD_SIZE,
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

  } catch (err) {
    console.error('[Streaming Error]:', err.message);
    if (!res.headersSent) {
      res.status(500).send(`Streaming error: ${err.message}`);
    }
  }
});

// DEDICATED WATCH ONLINE PLAYER PAGE
app.get('/watch/:fileId', async (req, res) => {
  const fileId = (req.params.fileId || '').replace(/\.mp4$/i, '');
  const baseUrl = getBaseUrl(req);
  const streamUrl = `${baseUrl}/stream/${fileId}.mp4`;
  const downloadUrl = `${streamUrl}?dl=1`;

  // External Intent URLs
  const vlcIntent = `vlc://${streamUrl}`;
  const mxIntent = `intent:${streamUrl}#Intent;package=com.mxtech.videoplayer.ad;type=video/*;end`;
  const playitIntent = `playit://playit.app/video?url=${encodeURIComponent(streamUrl)}`;
  const appLink = `${APP_URL}/?stream=${encodeURIComponent(streamUrl)}`;

  const html = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Watch Online - Naresh World</title>
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',system-ui,-apple-system,sans-serif; }
    body { background:#0b0f19; color:#f1f5f9; min-height:100vh; display:flex; flex-direction:column; align-items:center; padding:16px; }
    .container { max-width:820px; width:100%; margin:0 auto; }
    .header { text-align:center; padding:16px 0; }
    .header h1 { font-size:1.6rem; color:#38bdf8; font-weight:700; margin-bottom:4px; }
    .player-card { background:#151d30; border-radius:14px; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.6); border:1px solid #1e293b; margin-bottom:20px; }
    .video-wrapper { position:relative; width:100%; background:#000; }
    video { width:100%; height:auto; aspect-ratio:16/9; max-height:75vh; }
    .btn-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:12px; margin-top:16px; }
    .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:12px 16px; border-radius:10px; font-weight:600; text-decoration:none; font-size:0.95rem; transition:0.2s; border:none; cursor:pointer; }
    .btn-app { background:linear-gradient(135deg,#0284c7,#2563eb); color:#fff; }
    .btn-dl { background:#10b981; color:#fff; }
    .btn-vlc { background:#ea580c; color:#fff; }
    .btn-mx { background:#0284c7; color:#fff; }
    .btn-copy { background:#334155; color:#fff; width:100%; margin-top:12px; }
    .btn:hover { opacity:0.9; transform:translateY(-1px); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎬 Naresh World Player</h1>
      <p style="color:#94a3b8; font-size:0.9rem;">High-Speed Telegram Video Streaming</p>
    </div>

    <div class="player-card">
      <div class="video-wrapper">
        <video id="player" playsinline controls preload="metadata">
          <source src="${streamUrl}" type="video/mp4">
        </video>
      </div>
      <div style="padding:16px;">
        <div class="btn-grid">
          <a href="${appLink}" target="_blank" class="btn btn-app"><i class="fas fa-play"></i> Open in App</a>
          <a href="${downloadUrl}" class="btn btn-dl"><i class="fas fa-download"></i> Direct Download</a>
          <a href="${vlcIntent}" class="btn btn-vlc"><i class="fas fa-play-circle"></i> VLC Player</a>
          <a href="${mxIntent}" class="btn btn-mx"><i class="fas fa-bolt"></i> MX Player</a>
        </div>
        <button class="btn btn-copy" onclick="copyStreamLink()"><i class="fas fa-copy"></i> Copy Direct Stream Link</button>
      </div>
    </div>
  </div>

  <script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>
  <script>
    const player = new Plyr('#player', {
      controls: ['play-large','play','progress','current-time','duration','mute','volume','captions','settings','pip','airplay','fullscreen'],
      tooltips: { controls: true, seek: true }
    });
    function copyStreamLink() {
      navigator.clipboard.writeText("${streamUrl}").then(() => {
        alert("✅ Direct Stream Link Copied!");
      });
    }
  </script>
</body>
</html>`;

  res.send(html);
});

// START HTTP SERVER & TELEGRAM CLIENT
app.listen(PORT, async () => {
  console.log(`[HTTP Server] Listening on port ${PORT}`);
  await startTelegramClient();
});
