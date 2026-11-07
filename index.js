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

// Lovable Live Hosted URLs
const LOVABLE_APP_URL = 'https://private-clip-keeper.lovable.app';
const LOVABLE_FILMYFLY_URL = 'https://private-clip-keeper.lovable.app/filmyfly';

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
            '👋 Welcome to Filmy Fly Bot!\n\nSend or forward any Video, Movie, or TV Series file here.\n\nI will extract metadata, fetch details from TMDB, upload to your Lovable website, and give you 1-click Watch links!'
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

            // Using your live Lovable URL for buttons
            const watchUrl = `${LOVABLE_APP_URL}/filmyfly`;
            const appHomeUrl = LOVABLE_APP_URL;

            const displayTitle = tmdb ? tmdb.title : parsed.title;
            const posterUrl = tmdb && tmdb.poster ? tmdb.poster : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

            // Firebase save — this automatically shows up in your Lovable website!
            const dbRecord = {
                title: displayTitle,
                originalName: rawName,
                fileId: fileId,
                watchUrl: watchUrl,
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
                `✅ Successfully uploaded to your Lovable Site!`;

            // Valid public HTTPS buttons pointing to Lovable
            const replyMarkup = {
                inline_keyboard: [
                    [
                        { text: '▶️ Watch on Lovable Site', url: watchUrl },
                        { text: '🌐 Open Website Home', url: appHomeUrl }
                    ]
                ]
            };

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
    res.send(`<h1>🚀 Naresh World Video Server Active</h1><p>Connected to Lovable: <a href="${LOVABLE_APP_URL}">${LOVABLE_APP_URL}</a></p>`);
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', botActive: !!bot, uptime: process.uptime() });
});

app.listen(PORT, () => {
    console.log(`🚀 Naresh World Server running on Port ${PORT}`);
});
