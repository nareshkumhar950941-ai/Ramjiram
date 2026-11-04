const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cors = require('cors');

// ==================== CONFIGURATION ====================
// Render Environment Variables se BOT_TOKEN lega
const BOT_TOKEN = process.env.BOT_TOKEN || '8793062384:AAHmZZpVwiWX7-1CsuofBZqhtoQBgymzNHk';
if (!BOT_TOKEN) {
  console.log('⚠️ BOT_TOKEN is missing in Environment Variables! Please add BOT_TOKEN in Render settings.');
}

const TMDB_API_KEY = '60826475ab1668347a09ec5f5f22b9e3';
const FIREBASE_DB_URL = 'https://app-seller-8980c-default-rtdb.firebaseio.com';
const PORT = process.env.PORT || 3000;
// ========================================================

const app = express();
app.use(cors());
app.use(express.json());

// 1. FRONTEND: index.html को सर्व करेगा
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Telegram Bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const userSessions = {};

// 2. VIDEO STREAMING: Telegram Videos ko Fast Direct Stream link banata hai
app.get('/stream/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
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
      const chunksize = (end - start) + 1;

      const stream = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
        headers: { Range: `bytes=${start}-${end}` }
      });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      });
      stream.data.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes'
      });
      const stream = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream'
      });
      stream.data.pipe(res);
    }
  } catch (error) {
    console.error('Stream Error:', error.message);
    res.status(500).send('Streaming error: ' + error.message);
  }
});

// TMDB Movie Search
async function searchTMDBMovie(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
  const res = await axios.get(url);
  return res.data.results[0] || null;
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
    year: (data.release_date || '').split('-')[0] || '2024',
    rating: (data.vote_average || 7.0).toFixed(1),
    genre: genre,
    poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
    backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : '',
    storyline: data.overview || 'No storyline',
    trailer: trailer,
    cast: cast,
    category: 'Bollywood',
    qualityBadge: '1080p Full HD',
    isPremium: false,
    timestamp: Date.now()
  };
}

// TMDB TV Show Search
async function searchTMDBSeries(query) {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
  const res = await axios.get(url);
  return res.data.results[0] || null;
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
    year: (data.first_air_date || '').split('-')[0] || '2024',
    rating: (data.vote_average || 7.5).toFixed(1),
    genre: genre,
    poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
    backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : '',
    storyline: data.overview || 'No storyline',
    trailer: trailer,
    cast: cast,
    category: 'Hollywood',
    qualityBadge: 'HD',
    isPremium: false,
    timestamp: Date.now(),
    episodes: {}
  };
}

// BOT COMMANDS
bot.onText(/\/start/, (msg) => {
  const text = `🎬 *Naresh World Bot*\n\n` +
    `1. \`/movie <Movie Name>\` - TMDB से मूवी निकालें और अपलोड करें\n` +
    `2. \`/tv <Series Name>\` - TMDB से टीवी शो ऐप में जोड़ें\n` +
    `3. \`/add_episode <SeriesID> <Season> <Episode>\` - एपिसोड जोड़ें\n` +
    `4. डायरेक्ट वीडियो फाइल भेजें streaming link पाने के लिए।`;
  bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
});

bot.onText(/\/movie (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const name = match[1];
  try {
    bot.sendMessage(chatId, `🔍 TMDB पर "${name}" ढूँढ रहा हूँ...`);
    const found = await searchTMDBMovie(name);
    if (!found) return bot.sendMessage(chatId, `❌ मूवी नहीं मिली।`);

    const details = await getTMDBMovieDetails(found.id);
    userSessions[chatId] = { type: 'movie', data: details };

    const caption = `🎬 *${details.title} (${details.year})*\n⭐ ${details.rating}/10 | 🎭 ${details.genre}\n\n👉 अब वीडियो फाइल भेजें या direct streaming link भेजें:`;
    if (details.poster) {
      await bot.sendPhoto(chatId, details.poster, { caption, parse_mode: 'Markdown' });
    } else {
      await bot.sendMessage(chatId, caption, { parse_mode: 'Markdown' });
    }
  } catch (e) {
    bot.sendMessage(chatId, `Error: ${e.message}`);
  }
});

bot.onText(/\/tv (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const name = match[1];
  try {
    bot.sendMessage(chatId, `🔍 TMDB पर "${name}" खोज रहा हूँ...`);
    const found = await searchTMDBSeries(name);
    if (!found) return bot.sendMessage(chatId, `❌ शो नहीं मिला।`);

    const details = await getTMDBSeriesDetails(found.id);
    const fbRes = await axios.post(`${FIREBASE_DB_URL}/webseries.json`, details);
    const seriesId = fbRes.data.name;

    const caption = `✅ *${details.title}* ऐप में जुड़ गया!\n🆔 *Series ID:* \`${seriesId}\`\n\nअब एपिसोड डालने के लिए लिखें:\n\`/add_episode ${seriesId} 1 1\``;
    if (details.poster) {
      await bot.sendPhoto(chatId, details.poster, { caption, parse_mode: 'Markdown' });
    } else {
      await bot.sendMessage(chatId, caption, { parse_mode: 'Markdown' });
    }
  } catch (e) {
    bot.sendMessage(chatId, `Error: ${e.message}`);
  }
});

bot.onText(/\/add_episode (.+)/, (msg, match) => {
  const parts = match[1].split(' ');
  if (parts.length < 3) {
    return bot.sendMessage(msg.chat.id, `गलत फॉर्मेट! लिखें: \`/add_episode <SeriesID> <Season> <Episode>\``, { parse_mode: 'Markdown' });
  }
  const [seriesId, season, ep] = parts;
  userSessions[msg.chat.id] = {
    type: 'episode',
    seriesId: seriesId.trim(),
    season: parseInt(season, 10),
    episode: parseInt(ep, 10)
  };
  bot.sendMessage(msg.chat.id, `📺 Season ${season}, Episode ${ep} के लिए वीडियो या लिंक भेजें:`);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text && msg.text.startsWith('/')) return;

  const session = userSessions[chatId];
  let videoLink = '';

  const renderUrl = process.env.RENDER_EXTERNAL_URL || '';

  if (msg.video || msg.document) {
    const fileId = msg.video ? msg.video.file_id : msg.document.file_id;
    const base = renderUrl ? renderUrl.replace(/\/$/, '') : `http://localhost:${PORT}`;
    videoLink = `${base}/stream/${fileId}`;
    bot.sendMessage(chatId, `⚡ Direct Stream Link:\n\`${videoLink}\``, { parse_mode: 'Markdown' });
  } else if (msg.text && (msg.text.startsWith('http://') || msg.text.startsWith('https://'))) {
    videoLink = msg.text.trim();
  }

  if (!videoLink || !session) return;

  if (session.type === 'movie') {
    try {
      bot.sendMessage(chatId, `⏳ ऐप में सेव हो रहा है...`);
      const payload = { ...session.data, link: videoLink };
      await axios.post(`${FIREBASE_DB_URL}/movies.json`, payload);
      delete userSessions[chatId];
      bot.sendMessage(chatId, `🎉 *${payload.title} ऐप में लाइव हो गई!*`, { parse_mode: 'Markdown' });
    } catch (e) {
      bot.sendMessage(chatId, `Error: ${e.message}`);
    }
  } else if (session.type === 'episode') {
    try {
      bot.sendMessage(chatId, `⏳ एपिसोड सेव हो रहा है...`);
      const payload = {
        season: session.season,
        episode: session.episode,
        title: `Episode ${session.episode}`,
        thumbnail: '',
        link: videoLink,
        isPremium: false
      };
      await axios.post(`${FIREBASE_DB_URL}/webseries/${session.seriesId}/episodes.json`, payload);
      delete userSessions[chatId];
      bot.sendMessage(chatId, `🎉 *Season ${session.season} Episode ${session.episode} ऐप में लाइव!*`, { parse_mode: 'Markdown' });
    } catch (e) {
      bot.sendMessage(chatId, `Error: ${e.message}`);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
