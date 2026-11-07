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

function getServerBaseUrl() {
  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, '');
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
        `4️⃣ कोई भी वीडियो भेजें — तुरंत डायरेक्ट 1GB+ स्ट्रीमिंग लिंक पाएं!`;
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

        const fileData = {
          id: docId,
          accessHash,
          fileReference: fileReferenceHex,
          dcId,
          size: fileSize,
          mimeType,
          timestamp: Date.now()
        };

        // Save in-memory and Firebase
        fileCache.set(docId, fileData);
        axios.put(`${FIREBASE_DB_URL}/tg_files/${docId}.json`, fileData).catch(() => {});

        const base = getServerBaseUrl();
        videoLink = `${base}/stream/${docId}.mp4`;

        await client.sendMessage(senderId, {
          message: `⚡ **1GB+ Video Ready!**\n📦 Size: **${sizeMB} MB**\n🔗 **Stream Link:**\n\`${videoLink}\``
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

// ================= HIGH-SPEED 1GB+ VIDEO STREAMING ENDPOINT =================
app.get('/stream/:fileId', async (req, res) => {
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
      // MTProto Stream (Supports up to 2GB files with Seeking!)
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

      res.writeHead(range ? 206 : 200, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': fileDoc.mimeType || 'video/mp4',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });

      const iter = client.iterDownload({
        file: loc,
        dcId: fileDoc.dcId,
        fileSize: bigInt(fileSize),
        offset: bigInt(start),
        limit: limit,
        chunkSize: CHUNK_DOWNLOAD_SIZE
      });

      let bytesSent = 0;
      for await (const chunk of iter) {
        if (res.writableEnded || req.destroyed) break;
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

      const stream = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
        headers: { Range: `bytes=${start}-${end}` }
      });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': '*'
      });
      stream.data.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*'
      });
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
