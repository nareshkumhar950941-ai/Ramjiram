const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// --- Configuration & Credentials ---
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAE9mbJzx5p_eSxtwvbi5Qwi88ODhWzZDwk';
const TMDB_API_KEY = process.env.TMDB_KEY || '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_DB_URL = process.env.FIREBASE_URL || 'https://app-seller-8980c-default-rtdb.firebaseio.com';
const PORT = process.env.PORT || 8080;

let bot = null;
if (BOT_TOKEN) {
    try {
        bot = new TelegramBot(BOT_TOKEN, { polling: true });
        console.log('[Telegram Bot] Bot polling active.');
    } catch (err) {
        console.error('[Telegram Bot] Polling start error:', err.message);
    }
} else {
    console.warn('[Telegram Bot] BOT_TOKEN missing. Polling skipped.');
}

// Global process error handlers
process.on('uncaughtException', (err) => {
    console.error('[Process Uncaught Exception]:', err.message);
});
process.on('unhandledRejection', (reason) => {
    console.error('[Process Unhandled Rejection]:', reason);
});

// Helper: Get Public Base URL (Safe Fallback to Render or Railway)
function getBaseUrl(req) {
    if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
    }
    if (process.env.RAILWAY_STATIC_URL) {
        return `https://${process.env.RAILWAY_STATIC_URL}`;
    }
    if (process.env.PUBLIC_URL && process.env.PUBLIC_URL.startsWith('http')) {
        return process.env.PUBLIC_URL.replace(/\/$/, '');
    }
    const host = req ? req.get('host') : null;
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
        return `https://${host}`;
    }
    // Fallback to live Render domain so URLs are always valid HTTPS
    return 'https://nareshworld.onrender.com';
}

// Helper: Extract Title, Year, Season & Episode from filename/caption
function parseVideoName(rawName) {
    if (!rawName) return { title: 'Unknown Media', year: null, season: null, episode: null, isSeries: false };

    let cleaned = rawName
        .replace(/https?:\/\/\S+/gi, '')
        .replace(/@[A-Za-z0-9_]+/gi, '')
        .replace(/\.(mkv|mp4|mov|avi|wmv|flv|webm)$/i, '')
        .replace(/[._\-+]/g, ' ')
        .replace(/\[.*?\]|\(.*?\)/g, ' ')
        .replace(/\b(480p|720p|1080p|2160p|4k|hd|fhd|hevc|x264|x265|bluray|webrip|web-dl|hdrip|dual audio|hindi|english|esubs?)\b/gi, '')
        .trim();

    const seMatch = cleaned.match(/s(\d{1,2})\s*e(\d{1,2})/i) || cleaned.match(/season\s*(\d{1,2})\s*episode\s*(\d{1,2})/i);
    let season = null, episode = null, isSeries = false;

    if (seMatch) {
        isSeries = true;
        season = parseInt(seMatch[1], 10);
        episode = parseInt(seMatch[2], 10);
        cleaned = cleaned.substring(0, seMatch.index).trim();
    } else {
        const epOnly = cleaned.match(/ep(?:isode)?\s*(\d{1,3})/i);
        if (epOnly) {
            isSeries = true;
            season = 1;
            episode = parseInt(epOnly[1], 10);
            cleaned = cleaned.substring(0, epOnly.index).trim();
        }
    }

    const yearMatch = cleaned.match(/\b(19\d{2}|20\d{2})\b/);
    let year = null;
    if (yearMatch) {
        year = yearMatch[1];
        cleaned = cleaned.substring(0, yearMatch.index).trim();
    }

    const title = cleaned.replace(/\s+/g, ' ').trim() || 'Unknown Title';
    return { title, year, season, episode, isSeries };
}

// Helper: Query TMDB for Movie / TV Details
async function fetchTmdbDetails(parsed) {
    if (!TMDB_API_KEY) return null;
    try {
        const type = parsed.isSeries ? 'tv' : 'movie';
        const url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(parsed.title)}${parsed.year ? `&year=${parsed.year}` : ''}`;
        const res = await axios.get(url, { timeout: 8000 });
        if (res.data && res.data.results && res.data.results.length > 0) {
            const hit = res.data.results[0];
            return {
                title: hit.title || hit.name || parsed.title,
                overview: hit.overview || '',
                poster: hit.poster_path ? `https://image.tmdb.org/t/p/w500${hit.poster_path}` : null,
                backdrop: hit.backdrop_path ? `https://image.tmdb.org/t/p/original${hit.backdrop_path}` : null,
                rating: hit.vote_average || 0,
                releaseDate: hit.release_date || hit.first_air_date || (parsed.year || '')
            };
        }
    } catch (err) {
        console.error('[TMDB API Error]:', err.message);
    }
    return null;
}

// Helper: Save movie / series record to Firebase Realtime Database
async function saveToFirebase(record, isSeries) {
    if (!FIREBASE_DB_URL) return;
    try {
        const endpoint = isSeries ? 'series' : 'movies';
        const pushUrl = `${FIREBASE_DB_URL.replace(/\/$/, '')}/${endpoint}.json`;
        await axios.post(pushUrl, record, { timeout: 8000 });
        console.log(`[Firebase] Saved item to ${endpoint}`);
    } catch (err) {
        console.error('[Firebase Save Error]:', err.message);
    }
}

// --- Telegram Bot Listeners ---
if (bot) {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(
            msg.chat.id,
            '👋 Welcome to Filmy Fly Bot!\n\nSend or forward any Video, Movie, or TV Series file here.\n\nI will extract metadata, fetch details from TMDB, create Watch/Download links, and upload to your website!'
        ).catch((err) => console.error('[Bot Start Message Error]:', err.message));
    });

    bot.on('message', async (msg) => {
        const media = msg.video || msg.document;
        if (!media) return;

        const chatId = msg.chat.id;
        const fileId = media.file_id;
        const rawName = media.file_name || msg.caption || 'Video_' + Date.now();
        const fileSizeMB = media.file_size ? (media.file_size / (1024 * 1024)).toFixed(1) : 'Unknown';

        const statusMsg = await bot.sendMessage(chatId, `⏳ Processing: ${rawName} (${fileSizeMB} MB)...`).catch(() => null);

        try {
            const parsed = parseVideoName(rawName);
            const tmdb = await fetchTmdbDetails(parsed);

            const baseUrl = getBaseUrl();
            const watchUrl = `${baseUrl}/watch/${fileId}`;
            const downloadUrl = `${baseUrl}/dl/${fileId}`;

            const displayTitle = tmdb ? tmdb.title : parsed.title;
            const posterUrl = tmdb && tmdb.poster ? tmdb.poster : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

            // Firebase save
            const dbRecord = {
                title: displayTitle,
                originalName: rawName,
                fileId: fileId,
                watchUrl: watchUrl,
                streamUrl: `${baseUrl}/stream/${fileId}`,
                downloadUrl: downloadUrl,
                poster: posterUrl,
                description: tmdb ? tmdb.overview : '',
                rating: tmdb ? tmdb.rating : 'N/A',
                isSeries: parsed.isSeries,
                season: parsed.season,
                episode: parsed.episode,
                createdAt: Date.now()
            };
            await saveToFirebase(dbRecord, parsed.isSeries);

            const captionText =
                `🎬 ${displayTitle}\n` +
                `📁 File: ${rawName}\n` +
                `📦 Size: ${fileSizeMB} MB\n\n` +
                `🔗 Watch: ${watchUrl}\n` +
                `⚡ Download: ${downloadUrl}\n\n` +
                `✅ Successfully processed & uploaded!`;

            // Inline buttons with valid HTTPS URLs
            const replyMarkup = {
                inline_keyboard: [
                    [
                        { text: '▶️ Watch Online', url: watchUrl },
                        { text: '⚡ Fast Download', url: downloadUrl }
                    ]
                ]
            };

            // Send photo with caption and buttons, with fallback
            if (tmdb && tmdb.poster) {
                await bot.sendPhoto(chatId, tmdb.poster, {
                    caption: captionText,
                    reply_markup: replyMarkup
                }).catch(async () => {
                    await bot.sendMessage(chatId, captionText, { reply_markup: replyMarkup });
                });
            } else {
                await bot.sendMessage(chatId, captionText, { reply_markup: replyMarkup });
            }

            if (statusMsg) {
                bot.deleteMessage(chatId, statusMsg.message_id).catch(() => {});
            }
        } catch (err) {
            console.error('[Bot Media Processing Error]:', err.message);
            bot.sendMessage(chatId, `⚠️ Error processing media: ${err.message}`).catch(() => {});
        }
    });

    bot.on('polling_error', (err) => {
        console.error('[Telegram Polling Error]:', err.message);
    });
}

// --- HTTP Routes ---
app.get('/', (req, res) => {
    res.send(`<h1>🚀 Naresh World Video Server Active</h1><p>Bot is running. Send videos to your Telegram Bot.</p>`);
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', botActive: !!bot, uptime: process.uptime() });
});

// Direct Download & Stream via Telegram Bot API
app.get(['/stream/:fileId', '/dl/:fileId'], async (req, res) => {
    const fileId = req.params.fileId;
    try {
        if (!BOT_TOKEN) return res.status(500).send('BOT_TOKEN is not configured.');
        const fileInfoUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`;
        const fileInfoRes = await axios.get(fileInfoUrl, { timeout: 10000 });

        if (!fileInfoRes.data || !fileInfoRes.data.ok) {
            return res.status(404).send('File not found in Telegram.');
        }

        const filePath = fileInfoRes.data.result.file_path;
        const downloadUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

        const headers = {};
        if (req.headers.range) {
            headers.Range = req.headers.range;
        }

        const streamRes = await axios({
            method: 'get',
            url: downloadUrl,
            responseType: 'stream',
            headers: headers,
            timeout: 60000
        });

        res.status(streamRes.status);
        for (const [k, v] of Object.entries(streamRes.headers)) {
            res.setHeader(k, v);
        }
        streamRes.data.pipe(res);
    } catch (err) {
        console.error('[Stream Route Error]:', err.message);
        if (err.response && err.response.status === 400) {
            return res.status(400).send('Telegram Bot API limit: File exceeds standard Bot download limit (20MB-50MB).');
        }
        res.status(500).send('Streaming error: ' + err.message);
    }
});

// Watch Player Page
app.get('/watch/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const baseUrl = getBaseUrl(req);
    const streamUrl = `${baseUrl}/stream/${fileId}`;
    const dlUrl = `${baseUrl}/dl/${fileId}`;
    const vlcUrl = `vlc://${streamUrl}`;
    const mxUrl = `intent:${streamUrl}#Intent;package=com.mxtech.videoplayer.ad;type=video/*;end`;
    const playitUrl = `playit://playerv2/video?url=${encodeURIComponent(streamUrl)}`;

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Watch Online - Naresh World</title>
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
  <style>
    body { margin: 0; background: #0b0f19; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 20px; box-sizing: border-box; }
    .container { width: 100%; max-width: 800px; }
    .player-box { width: 100%; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    video { width: 100%; aspect-ratio: 16/9; }
    .actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-top: 20px; }
    .btn { display: flex; align-items: center; justify-content: center; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; text-align: center; color: #fff; transition: opacity 0.2s; }
    .btn:active { opacity: 0.8; }
    .btn-dl { background: #2563eb; }
    .btn-vlc { background: #ea580c; }
    .btn-mx { background: #0284c7; }
    .btn-playit { background: #16a34a; }
  </style>
</head>
<body>
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 15px;">🎬 Naresh World Player</h2>
    <div class="player-box">
      <video id="player" playsinline controls>
        <source src="${streamUrl}" type="video/mp4">
        Your browser does not support video.
      </video>
    </div>
    <div class="actions">
      <a href="${dlUrl}" class="btn btn-dl" download>⚡ Direct Download</a>
      <a href="${vlcUrl}" class="btn btn-vlc">🟠 Open in VLC</a>
      <a href="${mxUrl}" class="btn btn-mx">🔵 Open in MX Player</a>
      <a href="${playitUrl}" class="btn btn-playit">🟢 Open in PLAYit</a>
    </div>
  </div>
  <script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>
  <script>
    const player = new Plyr('#player', { controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'] });
  </script>
</body>
</html>`);
});

app.listen(PORT, () => {
    console.log(`🚀 Naresh World Server running on Port ${PORT}`);
});
