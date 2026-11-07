/**
 * Naresh World - Telegram Video Streamer & Firebase Auto-Uploader
 * Complete Backend for Railway / Render
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURATION & CREDENTIALS
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAHmZZpVwiWX7-1CsuofBZqhtoQBgymzNHk';
const TMDB_KEY = process.env.TMDB_KEY || '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_DB_URL = (process.env.FIREBASE_DB_URL || 'https://app-seller-8980c-default-rtdb.firebaseio.com').replace(/\/$/, '');

// MTProto / GramJS Credentials
const API_ID = parseInt(process.env.API_ID || '31266551', 10);
const API_HASH = process.env.API_HASH || 'f2ebfd089cc0958fbedad2088fdc917b';

// Helper: Determine Public Server Domain
function getBaseUrl(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, '');
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  if (process.env.RAILWAY_STATIC_URL) return `https://${process.env.RAILWAY_STATIC_URL}`;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, '');
  if (req && req.headers && req.headers.host) {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    return `${proto}://${req.headers.host}`;
  }
  return process.env.FALLBACK_URL || `http://localhost:${PORT}`;
}

// In-Memory cache for stored telegram files
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
  if (seMatch) {
    cleanTitle = cleanTitle.split(seMatch[0])[0];
  }
  if (yearMatch) {
    cleanTitle = cleanTitle.split(yearMatch[0])[0];
  }

  cleanTitle = cleanTitle.trim().replace(/\s+/g, ' ');
  if (!cleanTitle) cleanTitle = 'Special Feature';

  return {
    cleanTitle,
    year,
    isSeries,
    season: season || 1,
    episode: episode || 1
  };
}

// Helper: Query TMDB for poster, backdrop, storyline, rating
async function fetchTmdbMetadata(title, isSeries, year) {
  try {
    const endpoint = isSeries ? 'search/tv' : 'search/movie';
    let url = `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_KEY}&query=${encodeURIComponent(title)}&language=hi-IN`;
    if (year) {
      url += isSeries ? `&first_air_date_year=${year}` : `&year=${year}`;
    }

    let response = await axios.get(url, { timeout: 8000 });
    let results = response.data.results || [];

    if (results.length === 0) {
      const fallbackUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_KEY}&query=${encodeURIComponent(title)}&language=en-US`;
      response = await axios.get(fallbackUrl, { timeout: 8000 });
      results = response.data.results || [];
    }

    if (results.length > 0) {
      const item = results[0];
      const releaseDate = item.release_date || item.first_air_date || '';
      const itemYear = releaseDate ? releaseDate.split('-')[0] : (year || '2025');

      return {
        title: item.title || item.name || title,
        year: itemYear,
        rating: item.vote_average ? item.vote_average.toFixed(1) : '7.5',
        storyline: item.overview || 'Streaming available now on Naresh World.',
        poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500',
        backdrop: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280',
        tmdbId: item.id
      };
    }
  } catch (err) {
    console.error('[TMDB Fetch Warning]:', err.message);
  }

  return {
    title: title,
    year: year || '2025',
    rating: '7.5',
    storyline: 'Stream online or download in high speed.',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280',
    tmdbId: null
  };
}

// Helper: Save movie or webseries episode to Firebase Realtime Database
async function saveToFirebase(meta, streamUrl, isSeries, sNum, epNum) {
  const timestamp = Date.now();

  try {
    if (isSeries) {
      const seriesKey = meta.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const seriesRefUrl = `${FIREBASE_DB_URL}/webseries/${seriesKey}.json`;

      let existingSeries = null;
      try {
        const getRes = await axios.get(seriesRefUrl, { timeout: 5000 });
        existingSeries = getRes.data;
      } catch (e) {}

      const episodeKey = `s${sNum}_e${epNum}`;
      const newEpisode = {
        name: `Episode ${epNum}`,
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
      console.log(`[Firebase] Updated webseries: ${meta.title} S${sNum}E${epNum}`);
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
      console.log(`[Firebase] Saved movie: ${meta.title} (ID: ${res.data.name})`);
      return { type: 'movie', id: res.data.name, title: meta.title };
    }
  } catch (err) {
    console.error('[Firebase Save Error]:', err.message);
    throw err;
  }
}

// TELEGRAM BOT SETUP
let bot = null;
try {
  const TelegramBot = require('node-telegram-bot-api');
  bot = new TelegramBot(BOT_TOKEN, { polling: true });

  bot.on('polling_error', (error) => {
    console.error('[Telegram Polling Error]:', error.message);
  });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 
      `🎬 Welcome to Naresh World Video Streamer!\n\n` +
      `Send or forward any Movie or TV Show video file and I will:\n` +
      `1. Generate high-speed streaming links.\n` +
      `2. Automatically fetch Posters & TMDB details.\n` +
      `3. Auto-upload it to your App / Website!\n\n` +
      `🚀 Send your video now!`
    );
  });

  // Handle Video or Document Uploads
  bot.on('message', async (msg) => {
    const video = msg.video || msg.document;
    if (!video) return;

    const chatId = msg.chat.id;
    const fileId = video.file_id;
    const fileName = video.file_name || (msg.video ? 'Telegram_Video.mp4' : 'file.mp4');
    const caption = msg.caption || '';
    const rawText = caption.trim() ? caption : fileName;

    console.log(`[Telegram] Processing video from Chat ${chatId}: "${rawText}" (${video.file_size} bytes)`);

    const statusMsg = await bot.sendMessage(chatId, `⏳ Processing video...\n1. Parsing media title\n2. Searching TMDB for poster\n3. Saving to your App`);

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
        `🎬 Title: ${meta.title} (${meta.year || ""})\n` +
        `⭐ Rating: ${meta.rating}/10\n` +
        (parsed.isSeries ? `📺 Season: ${savedInfo.season} | Episode: ${savedInfo.episode}\n` : `📂 Type: Movie\n`) +
        `\n🎉 Successfully uploaded to your App!\n\n` +
        `🔗 Direct Stream:\n${streamUrl}\n\n` +
        `🌐 Web Player & VLC/MX:\n${watchUrl}\n\n` +
        `📥 Direct Download:\n${downloadUrl}`;

      const replyMarkup = {
        inline_keyboard: [
          [
            { text: "🚀 FAST DOWNLOAD", url: downloadUrl },
            { text: "📺 WATCH ONLINE", url: watchUrl }
          ]
        ]
      };

      await bot.deleteMessage(chatId, statusMsg.message_id).catch(() => {});

      if (meta.poster && meta.poster.startsWith("http")) {
        try {
          await bot.sendPhoto(chatId, meta.poster, {
            caption: replyText.substring(0, 1024),
            reply_markup: replyMarkup
          });
        } catch (photoErr) {
          console.warn("[Poster send failed, sending message instead]:", photoErr.message);
          await bot.sendMessage(chatId, replyText, { reply_markup: replyMarkup });
        }
      } else {
        await bot.sendMessage(chatId, replyText, { reply_markup: replyMarkup });
      }
    } catch (err) {
      console.error('[Process Error]:', err);
      bot.sendMessage(chatId, `❌ Failed to process video: ${err.message}`);
    }
  });

  console.log('[Telegram Bot] Bot polling active.');
} catch (botErr) {
  console.error('[Telegram Init Error]:', botErr.message);
}

// HTTP ENDPOINTS
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
    return {
      downloadUrl: `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`,
      fileSize: res.data.result.file_size
    };
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

    if (tgStreamRes.headers['content-range']) res.set('Content-Range', tgStreamRes.headers['content-range']);
    if (tgStreamRes.headers['content-length']) res.set('Content-Length', tgStreamRes.headers['content-length']);

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
  </style>
</head>
<body>
  <div class="container">
    <div class="player-wrapper">
      <video id="player" playsinline controls preload="metadata">
        <source src="${streamUrl}" type="video/mp4">
      </video>
    </div>
    <div class="info-box">
      <h1>Stream Player</h1>
      <p style="color: #888; font-size: 13px;">Play in external players if browser loading is slow:</p>
      <div class="btn-grid">
        <a href="${mxIntent}" class="btn btn-mx"><i class="fas fa-play"></i> MX Player</a>
        <a href="${vlcIntent}" class="btn btn-vlc"><i class="fas fa-traffic-cone"></i> VLC Player</a>
        <a href="${playitIntent}" class="btn btn-playit"><i class="fas fa-play-circle"></i> PLAYit</a>
        <a href="${downloadUrl}" class="btn btn-download" download><i class="fas fa-download"></i> Download</a>
      </div>
    </div>
  </div>
  <script>const player = new Plyr('#player');</script>
</body>
</html>`;
  res.send(html);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Naresh World Server running on Port ${PORT}`);
});
