/**
 * Naresh World - Telegram Video Streaming Backend & Auto Firebase Uploader
 * Compatible with Railway, Render, Koyeb, VPS, and Local Node.js
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// Configuration & Credentials
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAHmZZpVwiWX7-1CsuofBZqhtoQBgymzNHk';
const TMDB_KEY = process.env.TMDB_KEY || '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_DB_URL = (process.env.FIREBASE_DB_URL || 'https://app-seller-8980c-default-rtdb.firebaseio.com').replace(/\/$/, '');

// Helper: Determine Public Server Domain
function getBaseUrl(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, '');
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, '');
  if (req && req.headers && req.headers.host) {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    return `${proto}://${req.headers.host}`;
  }
  return `http://localhost:${PORT}`;
}

// In-Memory cache for telegram files
const fileCache = new Map();

// Helper: Clean filename / caption to extract Title, Year, Season, Episode
function parseMediaInfo(rawText) {
  if (!rawText) return { cleanTitle: 'Unknown Media', year: new Date().getFullYear(), isSeries: false };

  let text = rawText
    .replace(/@[\w\d_]+/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\[\(\{].*?[\]\)\}]/g, ' ')
    .replace(/[\._\-]/g, ' ')
    .trim();

  const tagsToRemove = [
    '480p', '720p', '1080p', '2160p', '4k', 'hdr', 'hevc', 'x264', 'x265', 
    '10bit', 'aac', 'web rip', 'webrip', 'web dl', 'webdl', 'bluray', 'hdrip', 
    'dvdrip', 'hindi', 'english', 'tamil', 'telugu', 'dual audio', 'esubs', 'subs'
  ];
  const tagRegex = new RegExp(`\\b(${tagsToRemove.join('|')})\\b`, 'gi');
  text = text.replace(tagRegex, ' ');

  const seMatch = text.match(/\bS(?:eason)?\s*(\d{1,2})\s*E(?:pisode)?\s*(\d{1,3})\b/i) ||
                  text.match(/\bE(?:pisode)?\s*(\d{1,3})\b/i);

  let season = null;
  let episode = null;
  let isSeries = false;

  if (seMatch) {
    isSeries = true;
    if (seMatch.length === 3) {
      season = parseInt(seMatch[1], 10);
      episode = parseInt(seMatch[2], 10);
    } else {
      season = 1;
      episode = parseInt(seMatch[1], 10);
    }
  }

  const yearMatch = text.match(/\b(19\d{2}|20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : null;

  let cleanTitle = text;
  if (seMatch) cleanTitle = cleanTitle.split(seMatch[0])[0];
  if (yearMatch) cleanTitle = cleanTitle.split(yearMatch[0])[0];
  cleanTitle = cleanTitle.replace(/\s+/g, ' ').trim();

  return { cleanTitle: cleanTitle || 'Untitled Video', year, isSeries, season, episode };
}

// Fetch Metadata from TMDB
async function fetchTmdbMetadata(title, isSeries, year) {
  try {
    const type = isSeries ? 'tv' : 'movie';
    let url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_KEY}&query=${encodeURIComponent(title)}`;
    if (year) {
      url += isSeries ? `&first_air_date_year=${year}` : `&year=${year}`;
    }

    const res = await axios.get(url, { timeout: 8000 });
    const results = res.data && res.data.results;
    if (results && results.length > 0) {
      const best = results[0];
      return {
        title: isSeries ? (best.name || title) : (best.title || title),
        poster: best.poster_path ? `https://image.tmdb.org/t/p/w500${best.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
        backdrop: best.backdrop_path ? `https://image.tmdb.org/t/p/original${best.backdrop_path}` : 'https://via.placeholder.com/1280x720?text=No+Backdrop',
        storyline: best.overview || 'Enjoy watching this high quality stream!',
        rating: best.vote_average ? best.vote_average.toFixed(1) : '7.5',
        year: (isSeries ? best.first_air_date : best.release_date)?.split('-')[0] || year || new Date().getFullYear(),
        tmdbId: best.id
      };
    }
  } catch (err) {
    console.error('TMDB Search Error:', err.message);
  }

  return {
    title,
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60',
    backdrop: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1280&auto=format&fit=crop&q=60',
    storyline: 'Streamed directly via Telegram Cloud.',
    rating: '7.8',
    year: year || new Date().getFullYear(),
    tmdbId: null
  };
}

// Upload Media Record to Firebase Realtime Database
async function saveToFirebase(meta, streamUrl, isSeries, season, episode) {
  try {
    const timestamp = Date.now();

    if (isSeries) {
      const seriesKey = (meta.title + '_' + meta.year).replace(/[.#$\[\]\/]/g, '_');
      const seriesRefUrl = `${FIREBASE_DB_URL}/webseries/${seriesKey}.json`;

      let existingSeries = null;
      try {
        const existRes = await axios.get(seriesRefUrl);
        existingSeries = existRes.data;
      } catch (e) {}

      const sNum = season || 1;
      const epNum = episode || 1;
      const episodeKey = `s${sNum}_e${epNum}`;

      const newEpisode = {
        title: `Episode ${epNum}`,
        episode: epNum,
        season: sNum,
        link: streamUrl,
        thumbnail: meta.backdrop || meta.poster,
        duration: '45m'
      };

      const episodes = existingSeries && existingSeries.episodes ? existingSeries.episodes : {};
      episodes[episodeKey] = newEpisode;

      const seriesPayload = {
        title: meta.title,
        poster: meta.poster,
        backdrop: meta.backdrop,
        storyline: meta.storyline,
        rating: meta.rating,
        year: meta.year,
        category: 'Series',
        timestamp: timestamp,
        type: 'webseries',
        episodes: episodes
      };

      await axios.put(seriesRefUrl, seriesPayload);
      console.log(`[Firebase] Successfully updated webseries: ${meta.title} S${sNum}E${epNum}`);
      return { type: 'webseries', id: seriesKey, title: meta.title, season: sNum, episode: epNum };
    } else {
      const moviePayload = {
        title: meta.title,
        poster: meta.poster,
        backdrop: meta.backdrop,
        storyline: meta.storyline,
        rating: meta.rating,
        year: meta.year,
        category: 'Bollywood',
        link: streamUrl,
        timestamp: timestamp,
        type: 'movie'
      };

      const res = await axios.post(`${FIREBASE_DB_URL}/movies.json`, moviePayload);
      console.log(`[Firebase] Successfully saved movie: ${meta.title} (ID: ${res.data.name})`);
      return { type: 'movie', id: res.data.name, title: meta.title };
    }
  } catch (err) {
    console.error('[Firebase Save Error]:', err.message);
    throw err;
  }
}

// ==========================================
// TELEGRAM BOT SETUP
// ==========================================
let bot = null;
try {
  const TelegramBot = require('node-telegram-bot-api');
  bot = new TelegramBot(BOT_TOKEN, { polling: true });

  bot.on('polling_error', (error) => {
    console.error('[Telegram Polling Error]:', error.message);
  });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 
      `🎬 *Welcome to Naresh World Video Streamer!*\n\n` +
      `Send me any Movie or TV Show video/file and I will:\n` +
      `1. Generate high-speed streaming links.\n` +
      `2. Automatically fetch Posters & TMDB details.\n` +
      `3. Auto-upload it to your App / Website!\n\n` +
      `🚀 *Send your video now!*`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.on('message', async (msg) => {
    const video = msg.video || msg.document;
    if (!video) return;

    const chatId = msg.chat.id;
    const fileId = video.file_id;
    const fileName = video.file_name || (msg.video ? 'Telegram_Video.mp4' : 'file.mp4');
    const caption = msg.caption || '';
    const rawText = caption.trim() ? caption : fileName;

    console.log(`[Telegram] Received video from Chat ${chatId}: "${rawText}" (${video.file_size} bytes)`);

    const statusMsg = await bot.sendMessage(chatId, `⏳ Processing video...\n1. Parsing filename\n2. Searching TMDB\n3. Generating streaming link`);

    try {
      const parsed = parseMediaInfo(rawText);
      const meta = await fetchTmdbMetadata(parsed.cleanTitle, parsed.isSeries, parsed.year);

      const baseUrl = getBaseUrl();
      const streamUrl = `${baseUrl}/stream/${fileId}.mp4`;
      const watchUrl = `${baseUrl}/watch/${fileId}`;
      const downloadUrl = `${baseUrl}/dl/${fileId}`;

      fileCache.set(fileId, {
        fileId,
        fileName,
        fileSize: video.file_size,
        mimeType: video.mime_type || 'video/mp4'
      });

      const savedInfo = await saveToFirebase(meta, streamUrl, parsed.isSeries, parsed.season, parsed.episode);

      const replyText = 
        `✅ *Successfully Processed & Uploaded to App!*\n\n` +
        `🎬 *Title:* ${meta.title} (${meta.year})\n` +
        `⭐ *Rating:* ${meta.rating}/10\n` +
        (parsed.isSeries ? `📺 *Season:* ${savedInfo.season} | *Episode:* ${savedInfo.episode}\n` : `📂 *Type:* Movie\n`) +
        `\n🔗 *Stream / Play Link:* \n${streamUrl}\n\n` +
        `🌐 *Web Player & Apps (VLC / MX):* \n${watchUrl}\n\n` +
        `📥 *Direct Download:* \n${downloadUrl}\n\n` +
        `🎉 *It is now LIVE on your website/app!*`;

      await bot.deleteMessage(chatId, statusMsg.message_id).catch(() => {});
      await bot.sendPhoto(chatId, meta.poster, {
        caption: replyText,
        parse_mode: 'Markdown'
      });

    } catch (err) {
      console.error('[Process Error]:', err);
      bot.sendMessage(chatId, `❌ Failed to process video: ${err.message}`);
    }
  });

  console.log('[Telegram Bot] Bot polling started successfully.');
} catch (botErr) {
  console.error('[Telegram Init Error]:', botErr.message);
}

// ==========================================
// STREAMING & HTTP ENDPOINTS
// ==========================================

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('<h1>Naresh World Streaming Server is Live!</h1>');
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

async function getTelegramDownloadUrl(fileId) {
  const getFileUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`;
  const res = await axios.get(getFileUrl, { timeout: 10000 });
  if (res.data && res.data.ok && res.data.result) {
    const filePath = res.data.result.file_path;
    const downloadUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
    return { downloadUrl, fileSize: res.data.result.file_size };
  }
  throw new Error('Could not retrieve file path from Telegram Bot API');
}

app.all(['/stream/:fileId', '/stream/:fileId.mp4'], async (req, res) => {
  const rawFileId = req.params.fileId.replace(/\.mp4$/i, '');

  if (req.method === 'HEAD') {
    res.set({
      'Accept-Ranges': 'bytes',
      'Content-Type': 'video/mp4',
      'Access-Control-Allow-Origin': '*'
    });
    return res.status(200).end();
  }

  try {
    const { downloadUrl } = await getTelegramDownloadUrl(rawFileId);
    const range = req.headers.range;

    const requestHeaders = {};
    if (range) requestHeaders['Range'] = range;

    const tgStreamRes = await axios({
      method: 'get',
      url: downloadUrl,
      headers: requestHeaders,
      responseType: 'stream',
      timeout: 15000
    });

    res.set({
      'Content-Type': tgStreamRes.headers['content-type'] || 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    if (tgStreamRes.headers['content-range']) {
      res.set('Content-Range', tgStreamRes.headers['content-range']);
    }
    if (tgStreamRes.headers['content-length']) {
      res.set('Content-Length', tgStreamRes.headers['content-length']);
    }

    res.status(tgStreamRes.status);
    tgStreamRes.data.pipe(res);

    tgStreamRes.data.on('error', (err) => {
      console.error('[Stream Pipe Error]:', err.message);
      if (!res.headersSent) res.status(500).end();
    });

  } catch (err) {
    console.error('[Stream Error]:', err.message);
    if (!res.headersSent) res.status(500).send(`Streaming error: ${err.message}`);
  }
});

app.get(['/dl/:fileId', '/dl/:fileId.mp4'], async (req, res) => {
  const rawFileId = req.params.fileId.replace(/\.mp4$/i, '');
  try {
    const { downloadUrl } = await getTelegramDownloadUrl(rawFileId);
    res.redirect(downloadUrl);
  } catch (err) {
    res.status(500).send(`Download error: ${err.message}`);
  }
});

app.get('/watch/:fileId', (req, res) => {
  const fileId = req.params.fileId.replace(/\.mp4$/i, '');
  const baseUrl = getBaseUrl(req);
  const streamUrl = `${baseUrl}/stream/${fileId}.mp4`;
  const downloadUrl = `${baseUrl}/dl/${fileId}`;

  const vlcIntent = `vlc://${streamUrl}`;
  const mxIntent = `intent:${streamUrl}#Intent;package=com.mxtech.videoplayer.ad;type=video/*;end`;
  const playitIntent = `playit://playit.app/video?url=${encodeURIComponent(streamUrl)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stream Video - Naresh World</title>
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
  <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background-color: #0b0b0b; color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; }
    .container { width: 100%; max-width: 800px; background: #161616; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.8); }
    .player-wrapper { width: 100%; background: #000; }
    video { width: 100%; max-height: 480px; }
    .info-box { padding: 20px; }
    h1 { font-size: 20px; margin-bottom: 12px; font-weight: 600; color: #fff; }
    .btn-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-top: 15px; }
    .btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; color: #fff; border: none; cursor: pointer; }
    .btn-download { background: #e50914; }
    .btn-mx { background: #0084ff; }
    .btn-vlc { background: #ff8800; }
    .btn-playit { background: #28a745; }
    .btn-copy { background: #2a2a2a; border: 1px solid #444; }
    .home-link { display: inline-block; margin-top: 15px; color: #aaa; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="player-wrapper">
      <video id="player" playsinline controls preload="metadata">
        <source src="${streamUrl}" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
    </div>
    <div class="info-box">
      <h1>Stream Player</h1>
      <p style="color: #888; font-size: 13px;">Play in MX Player or VLC:</p>
      
      <div class="btn-grid">
        <a href="${mxIntent}" class="btn btn-mx"><i class="fas fa-play"></i> MX Player</a>
        <a href="${vlcIntent}" class="btn btn-vlc"><i class="fas fa-traffic-cone"></i> VLC Player</a>
        <a href="${playitIntent}" class="btn btn-playit"><i class="fas fa-play-circle"></i> PLAYit</a>
        <a href="${downloadUrl}" class="btn btn-download" download><i class="fas fa-download"></i> Download</a>
      </div>

      <div style="margin-top: 15px;">
        <button class="btn btn-copy" style="width: 100%;" onclick="copyStreamLink()">
          <i class="fas fa-copy"></i> Copy Direct Stream Link
        </button>
      </div>

      <div style="text-align: center;">
        <a href="/" class="home-link"><i class="fas fa-arrow-left"></i> Back to Main App</a>
      </div>
    </div>
  </div>

  <script>
    const player = new Plyr('#player', {
      controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
    });
    function copyStreamLink() {
      navigator.clipboard.writeText("${streamUrl}").then(() => {
        alert("Stream link copied to clipboard!");
      });
    }
  </script>
</body>
</html>`;

  res.send(html);
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=============================================`);
  console.log(`🚀 Naresh World Server running on Port ${PORT}`);
  console.log(`🌐 Base URL: ${getBaseUrl()}`);
  console.log(`📡 Firebase DB: ${FIREBASE_DB_URL}`);
  console.log(`🤖 Telegram Bot connected`);
  console.log(`=============================================`);
});
