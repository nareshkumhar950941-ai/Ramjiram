const express = require('express');
const cors = require('cors');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAHmZZpVwiWX7-1CsuofBZqhtoQBgymzNHk';
const TMDB_API_KEY = process.env.TMDB_API_KEY || '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_DB_URL = 'https://app-seller-8980c-default-rtdb.firebaseio.com';
const LOVABLE_APP_URL = 'https://private-clip-keeper.lovable.app/filmyfly';

function getBaseUrl() {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, '');
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  return `http://localhost:${PORT}`;
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('polling_error', (error) => {
  console.error('[Telegram Polling Error]:', error.message);
});

console.log('[Telegram Bot] Polling started successfully.');

function parseMediaTitle(rawText) {
  if (!rawText) return { cleanTitle: 'Uploaded Video', year: null, isSeries: false, season: 1, episode: 1 };
  let title = rawText.replace(/\.[a-zA-Z0-9]{2,4}$/, '');
  title = title.replace(/[._\-]/g, ' ');
  title = title.replace(/\[.*?\]|\(.*?\)/g, ' ');
  title = title.replace(/\b(480p|720p|1080p|2160p|4k|hdrip|webrip|web-dl|bluray|x264|x265|hevc|aac|esub)\b/gi, ' ');

  const seMatch = title.match(/s(\d{1,2})\s*e(\d{1,2})/i) || title.match(/season\s*(\d{1,2})\s*episode\s*(\d{1,2})/i);
  let isSeries = false;
  let season = 1;
  let episode = 1;
  if (seMatch) {
    isSeries = true;
    season = parseInt(seMatch[1], 10);
    episode = parseInt(seMatch[2], 10);
    title = title.split(/s\d{1,2}\s*e\d{1,2}/i)[0];
  }

  const yearMatch = title.match(/\b(19\d{2}|20\d{2})\b/);
  const year = yearMatch ? yearMatch[1] : null;
  if (year) title = title.split(year)[0];

  const cleanTitle = title.trim().replace(/\s+/g, ' ') || 'Uploaded Video';
  return { cleanTitle, year, isSeries, season, episode };
}

async function fetchTmdbMetadata(title, year, isSeries) {
  try {
    const endpoint = isSeries ? 'search/tv' : 'search/movie';
    const params = { api_key: TMDB_API_KEY, query: title };
    if (year) {
      if (isSeries) params.first_air_date_year = year;
      else params.year = year;
    }
    const res = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, { params });
    const result = res.data.results && res.data.results[0];
    if (result) {
      return {
        title: result.title || result.name || title,
        description: result.overview || '',
        poster: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : '',
        backdrop: result.backdrop_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : '',
        rating: result.vote_average || 0,
        releaseDate: result.release_date || result.first_air_date || ''
      };
    }
  } catch (err) {
    console.error('[TMDB Error]:', err.message);
  }
  return { title, description: '', poster: '', backdrop: '', rating: 0, releaseDate: year || '' };
}

async function saveToFirebase(collection, data) {
  try {
    const res = await axios.post(`${FIREBASE_DB_URL}/${collection}.json`, data);
    return res.data && res.data.name;
  } catch (err) {
    console.error('[Firebase Error]:', err.message);
    return null;
  }
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const video = msg.video || msg.document;

  if (msg.text === '/start') {
    return bot.sendMessage(chatId, 'Namaste! Mujhe koi bhi movie ya video bhejein, main use app me upload karke direct stream link bana dunga.');
  }

  if (!video) return;

  const rawName = video.file_name || msg.caption || 'Video';
  const fileId = video.file_id;
  const fileSizeMb = ((video.file_size || 0) / (1024 * 1024)).toFixed(1);

  const statusMsg = await bot.sendMessage(chatId, `⏳ Video mili (${fileSizeMb} MB). Processing metadata...`);

  try {
    const parsed = parseMediaTitle(rawName);
    const tmdb = await fetchTmdbMetadata(parsed.cleanTitle, parsed.year, parsed.isSeries);
    const baseUrl = getBaseUrl();
    const streamUrl = `${baseUrl}/stream/${fileId}.mp4`;

    const record = {
      title: tmdb.title,
      description: tmdb.description,
      poster: tmdb.poster,
      backdrop: tmdb.backdrop,
      rating: tmdb.rating,
      releaseDate: tmdb.releaseDate,
      link: streamUrl,
      fileId: fileId,
      createdAt: Date.now()
    };

    const collection = parsed.isSeries ? 'webseries' : 'movies';
    const savedKey = await saveToFirebase(collection, record);

    const appWatchUrl = `${LOVABLE_APP_URL}?play=${savedKey || ''}&title=${encodeURIComponent(tmdb.title)}&stream=${encodeURIComponent(streamUrl)}`;

    const caption = `🎬 *${tmdb.title}*\n` +
      `📦 Size: ${fileSizeMb} MB\n\n` +
      `✅ Video app me add ho gayi hai!\n` +
      `Neeche button se direct app me dekhein:`;

    const replyMarkup = {
      inline_keyboard: [
        [{ text: '▶️ Watch in App (Filmy Fly)', url: appWatchUrl }],
        [{ text: '📥 Direct Stream / Download', url: streamUrl }]
      ]
    };

    await bot.editMessageText(caption, {
      chat_id: chatId,
      message_id: statusMsg.message_id,
      parse_mode: 'Markdown',
      reply_markup: replyMarkup
    });
  } catch (err) {
    console.error('[Bot Error]:', err);
    await bot.editMessageText(`❌ Error: ${err.message}`, {
      chat_id: chatId,
      message_id: statusMsg.message_id
    });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.get('/stream/:fileId', async (req, res) => {
  const fileId = req.params.fileId.replace(/\.mp4$/, '');
  try {
    const fileLink = await bot.getFileLink(fileId);
    const response = await axios({
      method: 'get',
      url: fileLink,
      responseType: 'stream',
      headers: req.headers.range ? { range: req.headers.range } : {}
    });

    res.status(response.status);
    Object.entries(response.headers).forEach(([k, v]) => res.setHeader(k, v));
    response.data.pipe(res);
  } catch (err) {
    console.error('[Stream Error]:', err.message);
    res.status(500).send('Streaming error');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
