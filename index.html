<!DOCTYPE html>
<html lang="en">
<head>
<meta name="google-site-verification" content="GANYet8w1slEnsKORUUr3GCTiYJfaem1mzoLyFsMRyE" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Naresh World - User App</title>
    <!-- Firebase Scripts -->
    <script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-database-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.15.0/firebase-auth-compat.js"></script>
    
    <!-- Plyr.io Player CSS & JS -->
    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
    <!-- HLS.js for Streaming -->
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
<style>
    /* ========== ALL EXISTING STYLES (unchanged) ========== */
    :root {
        --primary-color: #e50914;
        --primary-glow: rgba(229, 9, 20, 0.5);
        --premium-gold: #ffb700;
        --premium-glow: rgba(255, 183, 0, 0.5);
        --bg-color: #0b0b0b;
        --card-bg: #101010;
        --text-primary: #ffffff;
        --text-secondary: #a0a0a0;
        --border-color: rgba(255, 255, 255, 0.1);
        --plyr-color-main: var(--primary-color);
        --plyr-font-family: 'Poppins', sans-serif;
    }
    
    body[data-theme="ocean-blue"] { --primary-color: #00a8ff; --primary-glow: rgba(0, 168, 255, 0.5); }
    body[data-theme="forest-green"] { --primary-color: #2ecc71; --primary-glow: rgba(46, 204, 113, 0.5); }
    body[data-theme="royal-purple"] { --primary-color: #9b59b6; --primary-glow: rgba(155, 89, 182, 0.5); }
    body[data-theme="sunset-orange"] { --primary-color: #f39c12; --primary-glow: rgba(243, 156, 18, 0.5); }
    body[data-theme="cyber-pink"] { --primary-color: #ff00ff; --primary-glow: rgba(255, 0, 255, 0.5); }

    body[data-mode="light"] {
        --bg-color: #f4f4f9;
        --card-bg: #ffffff;
        --text-primary: #121212;
        --text-secondary: #555555;
        --border-color: rgba(0, 0, 0, 0.1);
    }
    /* Light Mode styles */
    body[data-mode="light"] .logo .movie-text, body[data-mode="light"] .header-icons i { color: #121212; }
    body[data-mode="light"] .header.scrolled { background-color: rgba(255, 255, 255, 0.9); }
    body[data-mode="light"] .bottom-nav { background: rgba(240, 240, 240, 0.8); }
    body[data-mode="light"] .nav-item { color: #555555; }
    body[data-mode="light"] .trending-card .trending-rank { color: rgba(20, 20, 20, 0.8); text-shadow: none; }
    body[data-mode="light"] .trending-card .trending-title { color: #121212; text-shadow: none; }
    body[data-mode="light"] .trending-card::after { background: linear-gradient(to top, rgba(255,255,255,0.8) 10%, transparent); }
    body[data-mode="light"] .slide-overlay { background: linear-gradient(to top, rgba(244,244,249,1) 10%, transparent); }
    body[data-mode="light"] .back-btn, body[data-mode="light"] .player-back-btn { background: rgba(255,255,255,0.5); color: #121212; }
    body[data-mode="light"] #livetv-player-page { background-color: #e9eaf0; }

    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; -webkit-tap-highlight-color: transparent; outline: none; }
    body { background-color: var(--bg-color); color: var(--text-primary); max-width: 480px; margin: 0 auto; overflow-x: hidden; -webkit-font-smoothing: antialiased; transition: background-color 0.3s ease, color 0.3s ease;}
    .hidden { display: none !important; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 var(--primary-glow); } 70% { box-shadow: 0 0 0 8px rgba(229, 9, 20, 0); } 100% { box-shadow: 0 0 0 0 rgba(229, 9, 20, 0); } }
    
    /* Continue Watching Progress Bar */
    .progress-bar-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255,255,255,0.2);
        z-index: 5;
    }
    .progress-bar-fill {
        height: 100%;
        background: var(--primary-color);
        width: 0%;
        transition: width 0.1s;
        box-shadow: 0 0 5px var(--primary-glow);
    }

    /* SPECIAL SCREENS */
    #maintenance-page, #banned-page, #update-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--bg-color); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 30px; z-index: 10000; }
    .special-icon { font-size: 60px; color: var(--primary-color); margin-bottom: 25px; }
    .special-title { font-size: 28px; font-weight: 700; margin-bottom: 15px; }
    .special-desc { font-size: 16px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 25px; }
    .special-btn { background: var(--primary-color); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block;}

    #loading-page { 
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background-color: var(--bg-color); 
        display: flex; justify-content: center; align-items: center; 
        z-index: 9999; 
        transition: opacity 0.5s ease;
    }
    #loading-page.fade-out { opacity: 0; }
    #loading-page .logo { 
        font-size: 48px; font-weight: 700; letter-spacing: -1.5px; 
        text-shadow: 0 0 20px var(--primary-glow); 
        animation: fadeIn 1s ease; 
    }
    #loading-page .logo .movie-text { color: white; }
    #loading-page .logo .hunt-text { color: var(--primary-color); }

    #auth-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; background: var(--bg-color) url('https://i.ibb.co/svdhXJrL/1001802230.jpg') center center/cover; }
    #auth-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to top, rgba(11, 11, 11, 1) 20%, rgba(11, 11, 11, 0.6) 60%, rgba(11, 11, 11, 0.9) 100%); }
    .auth-page { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; padding: 20px; position: relative; animation: fadeIn 0.5s ease; }
    .auth-logo { text-align: center; margin-bottom: 40px; }
    .auth-logo .logo { font-size: 42px; font-weight: 700; letter-spacing: -1.5px; text-shadow: 0 0 15px var(--primary-glow); }
    .auth-logo .logo .movie-text { color: white; }
    .auth-logo .logo .hunt-text { color: var(--primary-color); }
    .auth-form { width: 100%; max-width: 350px; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); padding: 30px; border-radius: 20px; border: 1px solid var(--border-color); }
    .auth-form h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 25px; }
    .input-group { position: relative; margin-bottom: 20px; }
    .auth-input { width: 100%; padding: 15px 45px 15px 20px; background-color: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; color: #fff; font-size: 15px; outline: none; transition: all 0.3s; }
    .auth-input:focus { border-color: var(--primary-color); box-shadow: 0 0 10px var(--primary-glow); }
    .password-toggle { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: var(--text-secondary); cursor: pointer; font-size: 18px; }
    .auth-btn { width: 100%; padding: 15px; background-color: var(--primary-color); border: none; border-radius: 12px; color: white; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px var(--primary-glow); margin-top: 10px; }
    .auth-btn:hover { background-color: #ff1a25; transform: translateY(-2px); }
    .auth-btn.guest-btn { background-color: transparent; border: 2px solid var(--primary-color); margin-top: 15px; }
    .auth-btn.guest-btn:hover { background-color: var(--primary-color); }
    .auth-switch-link { text-align: center; margin-top: 25px; font-size: 14px; color: var(--text-secondary); }
    .auth-switch-link a { color: var(--primary-color); font-weight: 600; text-decoration: none; cursor: pointer; }
    .error-message { color: var(--primary-color); font-size: 13px; text-align: center; margin-top: 15px; display: none; }
    .avatar-selector { margin-top: 20px; }
    .avatar-selector p { text-align: center; font-size: 14px; color: var(--text-secondary); margin-bottom: 15px; }
    .avatar-choices { display: flex; justify-content: center; gap: 15px; }
    .avatar-choice { width: 50px; height: 50px; border-radius: 50%; overflow: hidden; cursor: pointer; border: 3px solid transparent; transition: all 0.3s ease; }
    .avatar-choice img { width: 100%; height: 100%; object-fit: cover; }
    .avatar-choice.selected { border-color: var(--primary-color); transform: scale(1.1); box-shadow: 0 0 15px var(--primary-glow); }
    #app-wrapper { padding-bottom: 80px; }
    .page-container { animation: fadeIn 0.4s ease; }
    .header { padding: 15px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; transition: background-color 0.3s ease, padding 0.3s ease; background: transparent; }
    .header.scrolled { background-color: rgba(11, 11, 11, 0.9); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 12px 15px; border-bottom: 1px solid var(--border-color); }
    .logo { font-size: 28px; font-weight: 700; letter-spacing: -1px; text-shadow: 0 0 10px var(--primary-glow); }
    .logo .movie-text { color: white; }
    .logo .hunt-text { color: var(--primary-color); }
    .header-icons { display: flex; align-items: center; gap: 20px; }
    .header-icons i { font-size: 22px; color: white; cursor: pointer; transition: color 0.3s ease; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
    .header-icons i:hover { color: var(--primary-color); }
    .slider-container { position: relative; width: 100%; height: 280px; overflow: hidden; margin-bottom: 25px; }
    .slider { display: flex; transition: transform 0.5s ease; height: 100%; }
    .slide { min-width: 100%; height: 100%; position: relative; cursor: pointer; }
    .slide img { width: 100%; height: 100%; object-fit: cover; }
    .slide-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, var(--bg-color) 10%, transparent); padding: 20px; }
    .slide-title { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
    .slide-meta { font-size: 14px; font-weight: 500; color: var(--text-secondary); }
    .slider-indicators { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
    .indicator { width: 8px; height: 8px; border-radius: 50%; background-color: rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s; }
    .indicator.active { background-color: var(--primary-color); transform: scale(1.2); box-shadow: 0 0 8px var(--primary-glow); }
    
    .search-page { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--bg-color); z-index: 150; display: none; flex-direction: column; }
    .search-page.active { display: flex; animation: fadeIn 0.4s ease; }
    .search-header { display: flex; align-items: center; padding: 15px; flex-shrink: 0; border-bottom: 1px solid var(--border-color); }
    .search-header .back-btn-search { background: none; border: none; color: var(--text-primary); font-size: 20px; cursor: pointer; margin-right: 15px; }
    .search-header h1 { font-size: 22px; font-weight: 600; }
    .search-input-wrapper { position: relative; display: flex; align-items: center; width: 100%; padding: 15px; }
    .search-input-wrapper .search-icon { position: absolute; left: 33px; top: 50%; transform: translateY(-50%); color: var(--text-secondary); font-size: 16px; }
    .search-input-full { width: 100%; padding: 14px 50px 14px 45px; background-color: var(--card-bg); border: 1px solid var(--border-color); border-radius: 28px; color: var(--text-primary); font-size: 16px; outline: none; transition: all 0.3s; }
    .search-input-full:focus { border-color: var(--primary-color); box-shadow: 0 0 15px var(--primary-glow); }
    .search-clear-btn { position: absolute; right: 30px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer; }
    .search-content-wrapper { flex-grow: 1; overflow-y: auto; padding-bottom: 90px; }
    #search-results-container { display: flex; flex-direction: column; gap: 15px; padding: 0 15px; }
    .search-results-container .empty-state { margin: 20px auto; }
    .search-result-card { display: flex; gap: 15px; background-color: var(--card-bg); border-radius: 12px; overflow: hidden; cursor: pointer; transition: background-color 0.3s ease; border: 1px solid transparent; }
    @media (hover: hover) {
        .search-result-card:hover { background-color: #1a1a1a; border-color: var(--primary-color); }
    }
    .search-result-poster { width: 90px; flex-shrink: 0; }
    .search-result-poster img { width: 100%; height: 100%; object-fit: cover; }
    .search-result-info { padding: 12px 12px 12px 0; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
    .search-result-title { font-size: 16px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px; }
    .search-result-meta { font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; }
    .search-result-storyline { font-size: 13px; color: var(--text-secondary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
    #search-initial-state { padding: 0 15px; }
        
    .header-icons .icon-wrapper { position: relative; }
    .unread-indicator { position: absolute; top: -2px; right: -4px; width: 10px; height: 10px; background-color: var(--primary-color); border-radius: 50%; border: 2px solid var(--bg-color); box-shadow: 0 0 8px var(--primary-glow); }
    #notification-page { padding: 0; }
    .notification-header { display: flex; align-items: center; justify-content: center; padding: 20px 15px 15px 15px; border-bottom: 1px solid var(--border-color); }
    .notification-header h1 { font-size: 22px; font-weight: 600; }
    .notification-list { padding: 15px; }
    .notification-card-wrapper { position: relative; background-color: #c62828; border-radius: 12px; margin-bottom: 15px; overflow: hidden; }
    .notification-card-actions { position: absolute; top: 0; right: 0; height: 100%; display: flex; align-items: center; padding: 0 20px; }
    .notification-card-actions .delete-btn { background: none; border: none; color: white; font-size: 24px; cursor: pointer; }
    .notification-card { display: flex; gap: 15px; background-color: var(--card-bg); padding: 15px; position: relative; z-index: 2; transition: transform 0.3s ease; touch-action: pan-y; }
    .notif-card-image { flex-shrink: 0; width: 70px; height: 100px; border-radius: 8px; background-color: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .notif-card-image img { width: 100%; height: 100%; object-fit: cover; }
    .notif-card-image .icon { font-size: 32px; color: var(--primary-color); }
    .notif-card-content { flex-grow: 1; display: flex; flex-direction: column; }
    .notif-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
    .notif-card-header h3 { font-size: 16px; font-weight: 600; color: var(--text-primary); }
    .unread-dot-card { width: 10px; height: 10px; background-color: var(--primary-color); border-radius: 50%; box-shadow: 0 0 8px var(--primary-glow); flex-shrink: 0; }
    .notif-card-message { font-size: 14px; color: var(--text-secondary); line-height: 1.5; flex-grow: 1; }
    .notif-card-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 12px; }
    .notif-card-footer .time { font-size: 12px; color: #888; }
    .watch-now-btn { background-color: var(--primary-color); color: white; border: none; padding: 6px 14px; font-size: 13px; font-weight: 500; border-radius: 20px; cursor: pointer; transition: background-color 0.2s; }
    .watch-now-btn:hover { background-color: #ff1a25; }
    .page-header { padding: 20px 15px 15px 15px; border-bottom: 1px solid var(--border-color); margin-bottom: 20px; }
    .page-header h1 { font-size: 22px; font-weight: 600; text-align: left; display: flex; align-items: center; gap: 12px; }
    .page-header.centered-header h1 { justify-content: center; text-align: center; width: 100%; }
    .watchlist-container-pro { display: flex; flex-direction: column; gap: 15px; padding: 15px; }
    .watchlist-card-pro { display: flex; background-color: var(--card-bg); border-radius: 12px; overflow: hidden; cursor: pointer; position: relative; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    
    @media (hover: hover) {
        .watchlist-card-pro:hover { transform: scale(1.03); box-shadow: 0 8px 25px rgba(0,0,0,0.5), 0 0 15px var(--primary-glow); }
        .watchlist-card-pro .remove-btn-pro:hover { background-color: var(--primary-color); transform: scale(1.1); }
        .auth-btn:hover { background-color: #ff1a25; transform: translateY(-2px); }
    }

    .watchlist-card-pro .poster { width: 100px; flex-shrink: 0; }
    .watchlist-card-pro .poster img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .watchlist-card-pro .info { padding: 15px; display: flex; flex-direction: column; flex-grow: 1; justify-content: center; }
    .watchlist-card-pro .info .title { font-size: 17px; font-weight: 600; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .watchlist-card-pro .info .meta { font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; }
    .watchlist-card-pro .info .play-icon { color: var(--primary-color); font-size: 18px; }
    .watchlist-card-pro .remove-btn-pro { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
    
    .profile-header-pro { position: relative; padding: 40px 20px 30px 20px; text-align: center; background: linear-gradient(180deg, rgba(229, 9, 20, 0.2) 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid var(--border-color); margin-bottom: 30px; }
    .profile-avatar-wrapper { position: relative; width: 110px; margin: 0 auto 15px; }
    .profile-avatar-pro { width: 110px; height: 110px; border-radius: 50%; border: 4px solid var(--primary-color); box-shadow: 0 0 20px var(--primary-glow); display: flex; justify-content: center; align-items: center; font-size: 52px; font-weight: 600; color: white; background-color: #333; overflow: hidden; }
    .profile-avatar-pro img { width: 100%; height: 100%; object-fit: cover; }
    #change-avatar-btn { position: absolute; bottom: 0; right: 0; background-color: var(--primary-color); color: white; border: 2px solid var(--bg-color); width: 32px; height: 32px; border-radius: 50%; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s ease; }
    #change-avatar-btn:hover { transform: scale(1.1); }
    .profile-name { font-size: 26px; font-weight: 700; margin-bottom: 5px; }
    .profile-email { font-size: 15px; color: var(--text-secondary); }
    .profile-stats { display: flex; justify-content: space-around; padding: 25px 15px; margin: 0 15px 30px 15px; background-color: var(--card-bg); border-radius: 15px; border: 1px solid var(--border-color); }
    .stat-item { text-align: center; }
    .stat-item .stat-number { font-size: 18px; font-weight: 600; color: var(--text-primary); }
    .stat-item .stat-label { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
    .form-page { padding: 20px 15px; }
    .form-page .auth-form { max-width: 100%; margin: 0 auto; background: transparent; backdrop-filter: none; border: none; padding: 10px 0; }
    .form-page .auth-form h1 { margin-bottom: 30px; }
    .settings-label { font-size: 14px; color: var(--text-secondary); margin-bottom: 10px; text-align: center; font-weight: 500;}
    .gender-radio-group { display: flex; justify-content: center; gap: 20px; margin-bottom: 25px; }
    .gender-radio-group label { display: flex; align-items: center; cursor: pointer; }
    .gender-radio-group input[type="radio"] { display: none; }
    .gender-radio-label { padding: 10px 25px; border: 2px solid var(--border-color); border-radius: 25px; transition: all 0.3s ease; font-weight: 500; }
    .gender-radio-group input[type="radio"]:checked + .gender-radio-label { background-color: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary); }
    .toast-notification { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background-color: #2a2a2a; color: white; padding: 12px 20px; border-radius: 25px; font-size: 14px; z-index: 1100; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; border: 1px solid var(--border-color); }
    .toast-notification.show { opacity: 1; transform: translateX(-50%) translateY(-10px); }
    .category-section { margin-bottom: 35px; }
    .category-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding: 0 15px; }
    .category-title { position: relative; font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 10px; color: var(--text-primary);}
    .category-title::before { content: ''; display: block; width: 5px; height: 24px; background-color: var(--primary-color); border-radius: 0; box-shadow: 0 0 8px var(--primary-glow); }
    .see-all-btn { color: var(--primary-color); text-decoration: none; font-size: 14px; font-weight: 500; text-shadow: 0 0 8px var(--primary-glow); transition: color 0.3s; }
    .see-all-btn:hover { color: white; }
    
    /* SMOOTH SCROLLING */
    .content-slider { 
        display: flex; overflow-x: auto; padding: 0 15px; 
        scrollbar-width: none; -ms-overflow-style: none; gap: 12px; 
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory; 
        padding-bottom: 10px;
    }
    .content-slider::-webkit-scrollbar { display: none; }
    .content-card, .trending-card, .backdrop-card { 
        flex-shrink: 0; position: relative; border-radius: 12px; 
        overflow: hidden; transition: all 0.3s ease; cursor: pointer; 
        background-color: var(--card-bg); 
        scroll-snap-align: start;
    }
    .content-card, .trending-card { flex: 0 0 130px; }
    .backdrop-card { flex: 0 0 220px; }
    
    @media (hover: hover) {
        .content-card:hover, .trending-card:hover, .backdrop-card:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.5), 0 0 15px var(--primary-glow); }
    }

    .content-card img, .trending-card img { width: 100%; aspect-ratio: 2/3; object-fit: cover; }
    .backdrop-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
    .content-card-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); text-align: center; }
    .content-card-title { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 0 6px rgba(255, 255, 255, 0.7); }
    
    .new-badge-ribbon { position: absolute; top: -1px; right: -1px; width: 50px; height: 50px; overflow: hidden; z-index: 2; }
    .new-badge-ribbon span { position: absolute; display: block; width: 80px; padding: 5px 0; background: var(--primary-color); box-shadow: 0 5px 10px rgba(0,0,0,0.2), 0 0 10px var(--primary-glow); color: #fff; font: 700 11px/1 'Poppins', sans-serif; text-shadow: 0 1px 1px rgba(0,0,0,0.2); text-transform: uppercase; text-align: center; right: -17px; top: 13px; transform: rotate(45deg); }
    
    .trending-card .trending-rank { position: absolute; bottom: -15px; left: 5px; font-size: 80px; font-weight: 900; color: rgba(255, 255, 255, 0.9); line-height: 1; z-index: 2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
    .trending-card .trending-title { position: absolute; bottom: 10px; left: 45px; right: 10px; font-size: 15px; font-weight: 700; color: white; line-height: 1.3; z-index: 3; text-shadow: 1px 1px 5px rgba(0,0,0,0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .trending-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60%; background: linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent); z-index: 1; }
    .content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding: 15px; }
    .content-grid .content-card { flex-basis: auto; }
    .live-badge { position: absolute; top: 8px; left: 8px; background-color: var(--primary-color); color: white; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; animation: pulse 2s infinite; box-shadow: 0 2px 5px rgba(0,0,0,0.5); }
    .detail-page { display: none; padding-bottom: 30px; }
    .detail-backdrop { width: 100%; height: 250px; position: relative; }
    .detail-backdrop img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
    .detail-backdrop::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 100px; background: linear-gradient(to top, var(--bg-color) 20%, transparent); }
    .detail-content { padding: 15px; position: relative; z-index: 10; }
    .detail-title { font-size: 26px; font-weight: 700; line-height: 1.2; margin-bottom: 10px; }
    .detail-meta { font-size: 15px; color: var(--text-secondary); margin-bottom: 20px; font-weight: 500;}
    .detail-actions { margin-bottom: 25px; }
    .btn-play-full { background-color: var(--primary-color); color: var(--text-primary); border: none; padding: 15px; width: 100%; border-radius: 50px; cursor: pointer; font-size: 16px; font-weight: 600; display: flex; justify-content: center; align-items: center; gap: 10px; transition: all 0.2s ease; box-shadow: 0 4px 15px var(--primary-glow); }
    .btn-play-full:hover { background-color: #ff1a25; }
    .btn-play-full i { font-size: 18px; }
    .storyline-wrapper { margin-bottom: 25px; }
    .detail-storyline { font-size: 15px; color: var(--text-secondary); line-height: 1.6; }
    .secondary-actions-container { display: flex; justify-content: space-around; padding: 10px 0; margin-bottom: 30px; }
    .action-icon-btn { display: flex; flex-direction: column; align-items: center; gap: 5px; color: var(--text-secondary); cursor: pointer; font-size: 12px; font-weight: 500; transition: color 0.3s ease, transform 0.2s ease; width: 70px; text-align: center; background: none; border: none; }
    .action-icon-btn i { font-size: 24px; }
    .action-icon-btn:hover { color: var(--text-primary); transform: scale(1.1); }
    .action-icon-btn.active { color: var(--primary-color); }
    .action-icon-btn span.action-count { font-size: 11px; color: var(--text-secondary); font-weight: 400; transition: color 0.3s ease; }
    .action-icon-btn.active span.action-count { color: var(--primary-color); }
    .cast-section { margin-bottom: 30px; }
    .cast-list { display: flex; overflow-x: auto; gap: 15px; padding-bottom: 10px; scrollbar-width: none; }
    .cast-list::-webkit-scrollbar { display: none; }
    .cast-item { text-align: center; min-width: 80px; flex-shrink: 0; }
    .cast-item img { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; margin-bottom: 8px; border: 2px solid var(--border-color); transition: all 0.3s ease; }
    .cast-item:hover img { border-color: var(--primary-color); transform: scale(1.1); }
    .cast-item p { font-size: 13px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #similar-section .category-header { padding: 0; }
    .trailer-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); z-index: 600; display: none; justify-content: center; align-items: center; padding: 15px; }
    .trailer-modal.active { display: flex; animation: fadeIn 0.3s ease; }
    .trailer-video-wrapper { position: relative; width: 100%; max-width: 480px; aspect-ratio: 16/9; background: #000; }
    .trailer-video-wrapper iframe { width: 100%; height: 100%; border: none; }
    .trailer-close-btn { position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5); color: white; border: 2px solid white; width: 36px; height: 36px; border-radius: 50%; font-size: 28px; line-height: 32px; cursor: pointer; z-index: 601; font-weight: 300; transition: all 0.2s ease; text-align: center; padding: 0;}
    .trailer-close-btn:hover { background: var(--primary-color); border-color: var(--primary-color); transform: rotate(90deg); }
    .back-btn { position: fixed; top: 15px; left: 15px; background: rgba(0,0,0,0.5); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; z-index: 101; display: none; backdrop-filter: blur(5px); transition: background-color 0.3s ease; }
    .back-btn:hover { background-color: var(--primary-color); }
    .bottom-nav { position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%); width: calc(100% - 30px); max-width: 450px; height: 65px; background: rgba(20,20,20,0.8); backdrop-filter: blur(10px); border-radius: 35px; display: flex; justify-content: space-around; align-items: center; z-index: 200; border: 1px solid var(--border-color); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .nav-item { background: none; border: none; color: var(--text-secondary); display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; font-size: 11px; font-weight: 500; transition: all 0.3s ease; position: relative; padding: 8px 0; flex: 1; }
    .nav-item i { font-size: 22px; transition: color 0.3s ease; }
    .nav-item.active { color: var(--primary-color); transform: translateY(-5px); text-shadow: 0 0 5px var(--primary-glow); }
    .nav-item.active i { color: var(--primary-color); }
    .page-container.is-empty-page, .category-container.is-empty-page { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 200px); }
    .empty-state { text-align: center; padding: 20px 15px; color: var(--text-secondary); width: 100%; }
    .empty-state .empty-icon { font-size: 60px; margin-bottom: 20px; display: block; color: rgba(255,255,255,0.3); }
    .empty-state p { font-size: 18px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px; }
    .empty-state span { font-size: 14px; }
    .empty-state .request-movie-btn { margin-top: 25px; width: auto; padding: 12px 25px; font-size: 15px; display: inline-flex; align-items: center; gap: 10px; }
    .search-suggestions-group { margin-bottom: 35px; }
    .suggestion-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .suggestion-title { font-size: 18px; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
    .suggestion-title i { color: var(--primary-color); }
    .clear-btn { background: none; border: none; color: var(--primary-color); font-size: 13px; cursor: pointer; font-weight: 500; }
    .suggestion-tags-container { display: flex; flex-wrap: wrap; gap: 10px; }
    .suggestion-tag { padding: 8px 15px; background-color: var(--card-bg); border-radius: 20px; font-size: 14px; cursor: pointer; transition: all 0.2s ease; border: 1px solid var(--border-color); }
    .suggestion-tag:hover { background-color: var(--primary-color); color: var(--text-primary); border-color: var(--primary-color); }
    .recent-search-item { display: flex; align-items: center; padding: 12px 5px; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: background-color 0.2s ease; }
    .recent-search-item:last-child { border-bottom: none; }
    .recent-search-item:hover { background-color: rgba(255,255,255,0.05); }
    .recent-search-item .icon { color: var(--text-secondary); margin-right: 15px; font-size: 14px; width: 18px; text-align: center; }
    .recent-search-item .text { flex-grow: 1; color: var(--text-secondary); font-weight: 500; }
    .recent-search-item .remove-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 16px; padding: 5px; }
    #profile-page.page-container { padding: 0; }
    .profile-menu-group { margin: 0 15px 30px 15px; }
    .group-title { font-size: 14px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; padding-left: 5px; }
    .profile-menu .menu-item { background-color: var(--card-bg); border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 15px; margin-bottom: 12px; cursor: pointer; transition: all 0.3s ease; border: 1px solid transparent; }
    
    @media (hover: hover) {
        .profile-menu .menu-item:hover { background-color: #2a2a2a; border-color: var(--primary-color); transform: translateX(5px); }
    }

    .profile-menu .menu-item .icon { font-size: 18px; color: var(--primary-color); width: 20px; text-align: center; }
    .profile-menu .menu-item .text { flex-grow: 1; font-weight: 500; }
    .profile-menu .menu-item .chevron { font-size: 16px; color: var(--text-secondary); }
    .profile-menu .logout-item { border: 1px solid rgba(229, 9, 20, 0.5); }
    .profile-menu .logout-item .text { color: var(--primary-color); font-weight: 600; }
    .static-page-content { padding: 20px; color: var(--text-secondary); line-height: 1.7; }
    .static-page-content h2 { color: var(--text-primary); font-size: 18px; margin-bottom: 15px; }
    .static-page-content p { margin-bottom: 20px; font-size: 15px; }
    .static-page-content ul { padding-left: 20px; margin-bottom: 20px; }
    .static-page-content li { margin-bottom: 10px; }
    
    .player-page { background-color: var(--bg-color); z-index: 500; display: none; flex-direction: column; width: 100%; }
    .player-wrapper { width: 100%; position: relative; background-color: #000; overflow: hidden; font-size: 14px; -webkit-user-select: none; user-select: none; line-height: 0; aspect-ratio: 16/9; }
    
    /* VIDEO HARDWARE ACCELERATION */
    .player-wrapper video { width: 100%; height: 100%; display: block; object-fit: contain; transform: translateZ(0); will-change: transform; }
    
    .player-loading-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; z-index: 20; display: flex; justify-content: center; align-items: center; pointer-events: none; opacity: 0; transition: opacity 0.3s; }
    .player-loading-overlay.show { opacity: 1; pointer-events: auto; }
    .plyr__spinner { display: inline-block; width: 35px; height: 35px; border: 3px solid rgba(255, 255, 255, 0.3); border-radius: 50%; border-top-color: var(--primary-color); animation: spin 1s ease-in-out infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .player-error-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; z-index: 10; display: none; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: white; }
    .player-error-overlay.show { display: flex; }
    .player-error-overlay i { font-size: 48px; color: var(--primary-color); margin-bottom: 15px; }
    .player-error-overlay p { font-size: 16px; font-weight: 500; }
    .error-back-btn { margin-top: 20px; padding: 10px 25px; background-color: var(--primary-color); border: none; border-radius: 25px; color: white; font-size: 15px; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease; }
    .error-back-btn:hover { background-color: #ff1a25; }
    #movie-player-page, #series-player-page, #livetv-player-page { overflow-y: auto; }
    .movie-player-info, .livetv-player-info { padding: 20px 15px; }
    .movie-player-title { font-size: 24px; font-weight: 700; margin-bottom: 15px; }
    .movie-player-suggestions { padding-bottom: 20px; }
    .player-back-btn { position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.5); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; z-index: 25; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(5px); transition: background-color 0.3s ease; }
    .player-back-btn:hover { background-color: var(--primary-color); }
    .player-wrapper { --plyr-control-radius: 50%; --plyr-control-spacing: 10px; --plyr-tooltip-background: var(--primary-color); --plyr-tooltip-color: #fff; --plyr-range-thumb-height: 14px; --plyr-range-track-height: 5px; --plyr-control-icon-size: 20px; }
    .plyr--video .plyr__controls { background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 8px 10px 15px 10px; z-index: 60; }
    .plyr__controls__item.plyr__progress__container { flex: 1 1 auto; margin: 0 10px; }
    .plyr__control { background: transparent !important; border-radius: 50%; transition: background-color 0.2s ease; width: 40px; height: 40px; }
    .plyr__control:hover, .plyr__control:focus { background: rgba(255,255,255,0.15) !important; }
    .plyr__control.plyr__tab-focus, .plyr__control--overlaid:focus { box-shadow: 0 0 0 4px var(--primary-glow); }
    .plyr__play-large { width: 70px; height: 70px; border-radius: 50%; background: rgba(229, 9, 20, 0.8) !important; border: 2px solid white; box-shadow: 0 0 20px var(--primary-glow); transition: all 0.2s ease; }
    .plyr__play-large:hover { transform: scale(1.1); background: rgba(229, 9, 20, 1) !important; }
    .plyr__play-large svg { width: 24px; height: 24px; left: 25px; }
    .plyr--video .plyr__progress input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; border: 0; border-radius: 20px; color: var(--plyr-color-main); display: block; height: 18px; margin: 0; padding: 0; transition: box-shadow .3s ease; width: 100%; }
    .plyr__progress input[type=range]::-webkit-slider-thumb { background: #fff; border: 0; border-radius: 50%; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.15); height: 14px; width: 14px; position: relative; transition: all .2s ease; -webkit-appearance: none; }
    .plyr__progress input[type=range]:focus::-webkit-slider-thumb { box-shadow: 0 0 0 5px var(--primary-glow); }
    .plyr__time { font-size: 14px; }
    .plyr__preview-thumbnail { border: 2px solid white; border-radius: 6px; box-shadow: 0 3px 10px rgba(0,0,0,0.5); background: #000; }
    .plyr__preview-thumbnail .plyr__preview-time { font-size: 13px; background: rgba(0,0,0,0.6); border-radius: 4px; padding: 2px 6px; bottom: 6px; right: 6px; }
    
    .plyr__watermark { position: absolute; top: 15px; right: 15px; z-index: 21; opacity: 0.6; font-size: 16px; font-weight: 700; letter-spacing: -0.5px; pointer-events: none; color: white; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
    .plyr__watermark .hunt-text { color: var(--primary-color); }
    .plyr--fullscreen-active .plyr__watermark { font-size: 20px; }
    .video-fit-contain { object-fit: contain !important; }
    .video-fit-cover { object-fit: cover !important; }
    .video-fit-fill { object-fit: fill !important; }
    .plyr--fullscreen-active { width: 100vw !important; height: 100vh !important; position: fixed !important; top: 0; left: 0; right: 0; bottom: 0; z-index: 10000 !important; background: #000; border-radius: 0 !important; }
    .plyr--fullscreen-active video { width: 100% !important; height: 100% !important; }
    .plyr--fullscreen-active.player-wrapper { aspect-ratio: auto !important; height: 100vh !important; }

    /* PROFESSIONAL PLAYER GESTURES & ANIMATIONS */
    .double-tap-overlay {
        position: absolute; top: 0; bottom: 0; width: 40%; z-index: 50; display: flex; justify-content: center; align-items: center;
        opacity: 0; pointer-events: none; transition: opacity 0.2s; color: rgba(255,255,255,0.8); font-size: 24px;
        background: radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%);
    }
    .double-tap-overlay.left { left: 0; }
    .double-tap-overlay.right { right: 0; }
    .double-tap-overlay.active { opacity: 1; animation: ripple 0.5s ease-out; }
    .tap-icon-group { display: flex; flex-direction: column; align-items: center; }
    .tap-text { font-size: 12px; font-weight: 600; margin-top: 5px; }

    @keyframes ripple { 0% { transform: scale(0.8); opacity: 0; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 0; } }

    .video-overlay-feedback {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.6); padding: 15px; border-radius: 10px;
        color: white; font-size: 16px; z-index: 55; pointer-events: none;
        display: none; flex-direction: column; align-items: center; gap: 8px;
    }
    .video-overlay-feedback.show { display: flex; animation: fadeInOut 1s forwards; }
    .video-overlay-feedback i { font-size: 28px; color: var(--primary-color); }
    @keyframes fadeInOut { 0% { opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }

    #avatar-change-modal, #gender-choice-modal { position: fixed; bottom: 0; left: 0; max-width: 480px; margin: 0 auto; right: 0; background-color: var(--card-bg); z-index: 1100; border-top: 1px solid var(--border-color); border-top-left-radius: 20px; border-top-right-radius: 20px; padding: 25px 15px; transform: translateY(100%); transition: transform 0.3s ease-in-out; }
    #avatar-change-modal.show, #gender-choice-modal.show { transform: translateY(0); }
    #avatar-change-modal h3, #gender-choice-modal h3 { text-align: center; font-size: 18px; margin-bottom: 25px; }
    #avatar-change-modal .avatar-choices { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; justify-items: center; }
    #avatar-change-modal .avatar-choice { width: 80px; height: 80px; }
    .gender-choices { display: flex; justify-content: space-around; gap: 20px; }
    .gender-btn { background-color: var(--bg-color); border: 2px solid var(--border-color); color: var(--text-secondary); border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s ease; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; }
    .gender-btn i { font-size: 32px; }
    .gender-btn:hover { border-color: var(--primary-color); color: var(--primary-color); transform: translateY(-5px); }
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1099; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
    .modal-backdrop.show { opacity: 1; pointer-events: auto; }
    
    .auth-btn, .nav-item, .btn-play-full, .action-icon-btn, .menu-item, .suggestion-tag, .back-btn, .trailer-close-btn, .player-btn, .refresh-stream-btn, .error-back-btn, #change-avatar-btn, .search-clear-btn, .clear-btn, .remove-btn-pro, .channel-list-item, .indicator, .content-card, .trending-card, .gender-btn, .player-back-btn, .backdrop-card { transition: transform 0.1s ease-out; }
    .auth-btn:active, .nav-item:active, .btn-play-full:active, .action-icon-btn:active, .menu-item:active, .suggestion-tag:active, .back-btn:active, .trailer-close-btn:active, .player-btn:active, .refresh-stream-btn:active, .error-back-btn:active, #change-avatar-btn:active, .search-clear-btn:active, .clear-btn:active, .remove-btn-pro:active, .channel-list-item:active, .indicator:active, .content-card:active, .trending-card:active, .gender-btn:active, .player-back-btn:active, .backdrop-card:active { transform: scale(0.95); }
    
    .featured-series-card { position: relative; height: 350px; margin-bottom: 35px; border-radius: 0; overflow: hidden; background-color: var(--card-bg); cursor: pointer; }
    .featured-series-card .backdrop { width: 100%; height: 100%; object-fit: cover; }
    .featured-series-card .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to top, var(--bg-color) 20%, rgba(11,11,11,0.1) 60%, var(--bg-color) 100%); padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; }
    .featured-series-card .title { font-size: 32px; font-weight: 800; line-height: 1.2; margin-bottom: 8px; text-shadow: 0 3px 15px rgba(0,0,0,0.9); }
    .featured-series-card .meta { font-size: 15px; font-weight: 500; color: #ccc; text-shadow: 0 1px 5px rgba(0,0,0,0.7); margin-bottom: 15px; }
    
    #series-detail-page { padding-bottom: 30px; }
    .series-header { position: relative; width: 100%; height: 350px; }
    .series-header-backdrop { width: 100%; height: 100%; object-fit: cover; }
    .series-header-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to top, var(--bg-color) 15%, transparent 60%, var(--bg-color) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
    .series-header-content .detail-title { font-size: 32px; font-weight: 800; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.7); }
    .series-header-content .detail-meta { font-size: 15px; font-weight: 500; color: #ccc; margin-top: 10px; }
    #series-detail-page .detail-content { padding-top: 0; }
    .season-selector { display: flex; gap: 10px; padding: 0 15px 20px; border-bottom: 1px solid var(--border-color); overflow-x: auto; scrollbar-width: none;}
    .season-selector::-webkit-scrollbar { display: none; }
    .season-btn { background-color: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 20px; padding: 8px 18px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; flex-shrink: 0; }
    .season-btn.active { background-color: var(--primary-color); color: white; border-color: var(--primary-color); font-weight: 600; }
    .episode-slider-card { flex: 0 0 200px; background-color: var(--card-bg); border-radius: 12px; overflow: hidden; cursor: pointer; transition: all 0.3s ease; scroll-snap-align: start; }
    
    @media (hover: hover) {
        .episode-slider-card:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.5), 0 0 15px var(--primary-glow); }
        .episode-slider-card:hover .play-icon { opacity: 1; }
        .livetv-browse-card:hover .livetv-browse-card-logo-wrapper { transform: scale(1.05); box-shadow: 0 5px 15px rgba(0,0,0,0.3), 0 0 10px var(--primary-glow); }
        .episode-item:hover { border-color: var(--primary-color); transform: scale(1.05); }
        .episode-item:hover .play-icon-wrapper { opacity: 1; }
    }

    .episode-slider-card .thumb { width: 100%; aspect-ratio: 16/9; position: relative; }
    .episode-slider-card .thumb img { width: 100%; height: 100%; object-fit: cover; }
    .episode-slider-card .thumb .play-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 32px; color: rgba(255,255,255,0.8); text-shadow: 0 2px 5px #000; opacity: 0; transition: opacity 0.3s; }
    
    .episode-slider-card .info { padding: 12px; }
    .episode-slider-card .info .title { font-size: 14px; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .livetv-browse-filter-tabs { display: flex; gap: 10px; overflow-x: auto; padding: 15px; scrollbar-width: none; -ms-overflow-style: none; margin-top: 15px; }
    .livetv-browse-filter-tabs::-webkit-scrollbar { display: none; }
    .livetv-browse-filter-tab { flex-shrink: 0; padding: 8px 18px; background-color: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 20px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px; }
    .livetv-browse-filter-tab i { font-size: 16px; }
    .livetv-browse-card { flex: 0 0 110px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
    .livetv-browse-card-logo-wrapper { width: 100%; aspect-ratio: 1/1; background-color: var(--card-bg); border-radius: 12px; padding: 10px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; position: relative; }
    
    .livetv-browse-card img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .livetv-browse-card-name { font-size: 13px; font-weight: 500; color: var(--text-secondary); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; }
    .content-grid.livetv-grid { grid-template-columns: repeat(3, 1fr); }
    .content-grid.livetv-grid .livetv-browse-card { flex-basis: auto; }

    #livetv-player-page { display: none; flex-direction: column; height: 100vh; background-color: var(--bg-color); padding-bottom: 30px; }
    #livetv-player-page .player-wrapper { border-radius: 0; }

    #livetv-player-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 15px; justify-content: center; align-items: center; background: #000; font-size: 50px; color: rgba(255,255,255,0.3); position: absolute; top:0; left: 0; z-index: 1; }
    #livetv-player-placeholder p { font-size: 16px; font-weight: 500; color: var(--text-secondary); text-shadow: 0 0 10px var(--primary-glow); }
    #livetv-player-title { font-size: 24px; font-weight: 700; margin-bottom: 15px; }

    .autoplay-toggle-wrapper { display: flex; justify-content: flex-end; padding: 0 15px 20px; }
    .autoplay-toggle { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: var(--text-secondary); }
    .autoplay-toggle .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
    .autoplay-toggle .switch input { opacity: 0; width: 0; height: 0; }
    .autoplay-toggle .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 24px; }
    .autoplay-toggle .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
    .autoplay-toggle input:checked + .slider { background-color: var(--primary-color); }
    .autoplay-toggle input:checked + .slider:before { transform: translateX(20px); }

    #series-player-page .movie-player-info { padding: 20px 15px; }
    #series-player-page .movie-player-title { font-size: 22px; font-weight: 700; margin-bottom: 20px; }
    #series-player-page .secondary-actions-container { margin-bottom: 25px; }
    .episodes-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .episodes-header h3 { font-size: 18px; font-weight: 600; }
    #series-player-episode-list .episode-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    #series-player-episode-list .episode-item { flex-direction: column; gap: 8px; padding: 0; cursor: pointer; border-radius: 8px; overflow: hidden; background-color: var(--card-bg); border: 1px solid transparent; transition: all 0.3s ease; }
    
    #series-player-episode-list .episode-item.active { border-color: var(--primary-color); box-shadow: 0 0 10px var(--primary-glow); }
    #series-player-episode-list .episode-thumbnail { width: 100%; aspect-ratio: 16/9; position: relative; }
    #series-player-episode-list .episode-thumbnail img { width: 100%; height: 100%; object-fit: cover; }
    #series-player-episode-list .episode-thumbnail .play-icon-wrapper { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; font-size: 32px; color: white; opacity: 0; transition: opacity 0.3s ease; }
    
    #series-player-episode-list .episode-details { padding: 10px; width: 100%; }
    #series-player-episode-list .episode-details .title { font-size: 14px; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #series-player-episode-list .episode-details .ep-desc { display: none; } 
    
    #themes-page { padding: 15px; }
    .theme-section { margin-bottom: 30px; }
    .theme-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 0 5px;}
    .theme-section-title { font-size: 18px; font-weight: 600; }
    .mode-toggle .switch { position: relative; display: inline-block; width: 60px; height: 34px; }
    .mode-toggle .switch input { opacity: 0; width: 0; height: 0; }
    .mode-toggle .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 34px; }
    .mode-toggle .slider:before { content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
    .mode-toggle input:checked + .slider { background-color: #ccc; }
    .mode-toggle input:checked + .slider:before { transform: translateX(26px); }
    .theme-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .theme-option { cursor: pointer; text-align: center; }
    .theme-preview { width: 100%; height: 90px; border-radius: 12px; border: 2px solid var(--border-color); transition: all 0.3s ease; display: flex; overflow: hidden; position: relative; }
    
    @media (hover: hover) {
        .theme-option:hover .theme-preview { transform: translateY(-5px); border-color: var(--primary-color); }
    }

    .theme-option.active .theme-preview { border-color: var(--primary-color); box-shadow: 0 0 15px var(--primary-glow); }
    .theme-option.active .theme-preview::after { font-family: "Font Awesome 5 Free"; content: "\f00c"; font-weight: 900; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 28px; text-shadow: 0 2px 5px rgba(0,0,0,0.5); background-color: rgba(0,0,0,0.4); width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .theme-preview .color-1 { width: 60%; height: 100%; }
    .theme-preview .color-2 { width: 40%; height: 100%; }
    .theme-name { margin-top: 10px; font-size: 14px; font-weight: 500; color: var(--text-secondary); }
    #theme-classic-red .color-1 { background-color: #e50914; } #theme-classic-red .color-2 { background-color: #0b0b0b; }
    #theme-ocean-blue .color-1 { background-color: #00a8ff; } #theme-ocean-blue .color-2 { background-color: #0d1b2a; }
    #theme-forest-green .color-1 { background-color: #2ecc71; } #theme-forest-green .color-2 { background-color: #1a2520; }
    #theme-royal-purple .color-1 { background-color: #9b59b6; } #theme-royal-purple .color-2 { background-color: #211c24; }
    #theme-sunset-orange .color-1 { background-color: #f39c12; } #theme-sunset-orange .color-2 { background-color: #2c2419; }
    #theme-cyber-pink .color-1 { background-color: #ff00ff; } #theme-cyber-pink .color-2 { background-color: #221422; }

    :focus-visible {
        outline: 4px solid var(--primary-color);
        box-shadow: 0 0 20px var(--primary-glow);
        z-index: 50;
    }
    
    /* PREMIUM FEATURES STYLES */
    .premium-lock-overlay {
        position: absolute; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center;
        z-index: 5;
    }
    .premium-lock-icon {
        font-size: 24px; color: var(--premium-gold);
        text-shadow: 0 0 10px var(--premium-glow);
    }
    .plan-card {
        background: var(--card-bg);
        border: 1px solid var(--premium-gold);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 15px;
        position: relative;
        overflow: hidden;
    }
    .plan-card.popular::before {
        content: 'RECOMMENDED';
        position: absolute;
        top: 15px; right: -30px;
        background: var(--premium-gold);
        color: #000;
        font-size: 10px; font-weight: 800;
        padding: 5px 30px;
        transform: rotate(45deg);
    }
    .plan-price { font-size: 28px; font-weight: 700; color: var(--premium-gold); margin: 10px 0; }
    .plan-features li { font-size: 13px; margin-bottom: 8px; color: var(--text-secondary); list-style: none; display: flex; gap: 8px; }
    .plan-features li i { color: var(--premium-gold); }
    
    #payment-modal {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: var(--bg-color);
        z-index: 2000;
        display: none;
        flex-direction: column;
        padding: 20px;
        overflow-y: auto;
    }
    .qr-container {
        background: white;
        padding: 10px;
        border-radius: 10px;
        width: 200px; height: 200px;
        margin: 20px auto;
    }
    .qr-container img { width: 100%; height: 100%; object-fit: contain; }
    .gold-text { color: var(--premium-gold); }
    .copy-btn { background: var(--card-bg); border: 1px solid var(--border-color); color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 10px; font-size: 12px; }

    /* ADS OVERLAY STYLES */
    #ad-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #000; z-index: 10000;
        display: none; flex-direction: column;
        align-items: center; justify-content: center;
    }
    #ad-overlay.active { display: flex; }
    #ad-media-container { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; background: #000; }
    #ad-media-container img { max-width: 100%; max-height: 100%; object-fit: contain; cursor: pointer;}
    #ad-media-container video { width: 100%; height: 100%; object-fit: contain; cursor: pointer;}
    
    #ad-controls {
        position: absolute; top: 15px; right: 15px;
        display: flex; gap: 10px; align-items: center; z-index: 10001;
    }
    #ad-timer {
        background: rgba(0,0,0,0.6); color: white;
        padding: 8px 12px; border-radius: 20px; font-weight: 600; font-size: 14px;
        border: 1px solid rgba(255,255,255,0.2);
    }
    #ad-visit-btn {
        position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: var(--primary-color); color: white;
        padding: 12px 25px; border-radius: 30px; font-weight: 700;
        border: none; cursor: pointer; box-shadow: 0 5px 15px var(--primary-glow);
        z-index: 10001;
    }
    #ad-skip-btn {
        background: white; color: black;
        padding: 8px 15px; border-radius: 20px; font-weight: 600; font-size: 14px;
        border: none; cursor: pointer;
    }
    
    /* EMBED PLAYER STYLES */
    .player-iframe {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        border: none; z-index: 55; background: #000; display: none;
    }
    .player-iframe.active { display: block; }

    /* Redeem Code Page */
    #redeem-code-page .auth-form {
        background: transparent;
        backdrop-filter: none;
        border: none;
        padding: 10px 0;
        max-width: 100%;
        margin: 0 auto;
    }

    /* SHORTS STYLES */
    .shorts-swiper {
        scroll-snap-type: y mandatory;
        -webkit-overflow-scrolling: touch;
    }
    .short-card {
        scroll-snap-align: start;
    }
    .shorts-player-card {
        scroll-snap-align: start;
    }
    .shorts-header {
        background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent);
    }
</style>
</head>
<body data-theme="classic-red" data-mode="dark">
    
    <div id="maintenance-page" class="hidden">
        <i class="fas fa-tools special-icon"></i>
        <h1 class="special-title">Under Maintenance</h1>
        <p class="special-desc" id="maintenance-message-text">We are currently performing scheduled maintenance. We will be back shortly. Thank you for your patience.</p>
    </div>

    <!-- BANNED USER SCREEN -->
    <div id="banned-page" class="hidden">
        <i class="fas fa-ban special-icon" style="color: #ff1a25;"></i>
        <h1 class="special-title">Account Banned</h1>
        <p class="special-desc">Your account has been suspended due to policy violations. Please contact support if you think this is a mistake.</p>
        <button class="special-btn" onclick="handleLogout()">Log Out</button>
    </div>

    <!-- APP UPDATE SCREEN -->
    <div id="update-modal" class="hidden">
        <i class="fas fa-cloud-download-alt special-icon"></i>
        <h1 class="special-title">Update Available</h1>
        <p class="special-desc">A new version of the app is available. Please update to continue using the app.</p>
        <a id="update-btn-link" href="#" target="_blank" class="special-btn">Update Now</a>
    </div>

    <div id="loading-page">
        <div class="logo">
            <span class="movie-text">NARESH</span><span class="hunt-text">WORLD</span>
        </div>
    </div>

    <div id="auth-container" class="hidden">
        <div id="login-page-pro" class="auth-page">
            <div class="auth-logo">
                <div class="logo">
                    <span class="movie-text">NARESH</span><span class="hunt-text">WORLD</span>
                </div>
            </div>
            <div class="auth-form">
                <h1>Welcome Back</h1>
                <form id="login-form">
                    <div class="input-group"><input type="email" id="login-email" class="auth-input" placeholder="Email Address" required></div>
                    <div class="input-group"><input type="password" id="login-password" class="auth-input" placeholder="Password" required><i class="fas fa-eye password-toggle" onclick="togglePasswordVisibility('login-password', this)"></i></div>
                    <p id="login-error" class="error-message"></p>
                    <button type="submit" class="auth-btn">Login</button>
                </form>
                <button type="button" class="auth-btn guest-btn" id="guest-login-btn">Login as Guest</button>
                <p class="auth-switch-link">Don't have an account? <a onclick="toggleAuthForms()">Sign Up</a></p>
            </div>
        </div>
        <div id="signup-page-pro" class="auth-page hidden">
            <div class="auth-logo">
                <div class="logo">
                     <span class="movie-text">NARESH</span><span class="hunt-text">WORLD</span>
                </div>
            </div>
            <div class="auth-form">
                <h1>Create Account</h1>
                <form id="signup-form">
                    <div class="input-group"><input type="text" id="signup-name" class="auth-input" placeholder="Full Name" required></div>
                    <div class="input-group"><input type="email" id="signup-email" class="auth-input" placeholder="Email Address" required></div>
                    <div class="input-group"><input type="password" id="signup-password" class="auth-input" placeholder="Password" required><i class="fas fa-eye password-toggle" onclick="togglePasswordVisibility('signup-password', this)"></i></div>
                    <p id="signup-error" class="error-message"></p><button type="submit" class="auth-btn">Sign Up</button>
                </form>
                <p class="auth-switch-link">Already have an account? <a onclick="toggleAuthForms()">Login</a></p>
            </div>
        </div>
    </div>
<div id="app-wrapper" class="hidden">
    <button class="back-btn" id="back-btn" onclick="goBack()"><i class="fas fa-arrow-left"></i></button>
    <div id="home-page">
        <header class="header" id="home-header">
            <div class="logo">
                <span class="movie-text">NARESH</span><span class="hunt-text">WORLD</span>
            </div>
            <div class="header-icons">
                <i class="fas fa-search" onclick="navigateTo('search')" tabindex="0"></i>
                <div class="icon-wrapper">
                    <i class="fas fa-bell" onclick="navigateTo('notifications')" tabindex="0"></i>
                    <div id="unread-indicator" class="unread-indicator hidden"></div>
                </div>
            </div>
        </header>
        <div id="page-header" class="page-header hidden"><h1><i id="page-icon" class="fas fa-bookmark"></i> <span id="page-title">My Watchlist</span></h1></div>
        <main>
            <div id="category-container"></div>
        </main>
    </div>
    <div id="notification-page" class="page-container hidden">
        <div class="notification-header">
            <h1>Notifications</h1>
        </div>
        <div id="notification-list-container" class="notification-list"></div>
    </div>
    <div id="profile-page" class="page-container hidden">
        <div class="profile-header-pro">
            <div class="profile-avatar-wrapper">
                <div id="profile-avatar-container" class="profile-avatar-pro"></div>
                <button id="change-avatar-btn"><i class="fas fa-camera"></i></button>
            </div>
            <h2 id="profile-user-name" class="profile-name"></h2>
            <p id="profile-user-email" class="profile-email"></p>
        </div>
        <div class="profile-stats"> 
            <div class="stat-item">
                <div id="joining-date-stat" class="stat-number">Loading...</div>
                <div class="stat-label">Member Since</div>
            </div> 
        </div>
        
        <!-- PREMIUM BUTTON -->
        <div style="margin: 0 15px 20px 15px;">
            <button class="auth-btn" style="background: var(--premium-gold); color: #000; font-weight:800;" onclick="navigateTo('premium')">
                <i class="fas fa-crown"></i> GO PREMIUM
            </button>
        </div>

        <div class="profile-menu">
            <div class="profile-menu-group"><h3 class="group-title">My Activity</h3>
                <a class="menu-item" onclick="navigateTo('watchlist')" tabindex="0"><i class="icon fas fa-bookmark"></i><span class="text">My Watchlist</span><i class="chevron fas fa-chevron-right"></i></a>
                <a class="menu-item" id="movie-request-link" onclick="navigateTo('movieRequest')" tabindex="0"><i class="icon fas fa-film"></i><span class="text">Movie Request</span><i class="chevron fas fa-chevron-right"></i></a>
                <!-- NEW Redeem Code Link -->
                <a class="menu-item" id="redeem-code-link" onclick="navigateTo('redeemCode')" tabindex="0"><i class="icon fas fa-ticket-alt"></i><span class="text">Redeem Code</span><i class="chevron fas fa-chevron-right"></i></a>
            </div>
            <div class="profile-menu-group"><h3 class="group-title">Settings & Support</h3>
                <a class="menu-item" id="account-settings-link" onclick="navigateTo('accountSettings')" tabindex="0"><i class="icon fas fa-user-cog"></i><span class="text">Account Settings</span><i class="chevron fas fa-chevron-right"></i></a>
                <a class="menu-item" onclick="navigateTo('themes')" tabindex="0"><i class="icon fas fa-palette"></i><span class="text">Themes & Appearance</span><i class="chevron fas fa-chevron-right"></i></a>
                <a class="menu-item" onclick="navigateTo('help')" tabindex="0"><i class="icon fas fa-question-circle"></i><span class="text">Help & Support</span><i class="chevron fas fa-chevron-right"></i></a>
            </div>
            <div class="profile-menu-group"><h3 class="group-title">Legal</h3>
                <a class="menu-item" onclick="navigateTo('privacy')" tabindex="0"><i class="icon fas fa-shield-alt"></i><span class="text">Privacy Policy</span><i class="chevron fas fa-chevron-right"></i></a>
            </div>
            <div class="profile-menu-group"><a class="menu-item logout-item" onclick="handleLogout()" tabindex="0"><i class="icon fas fa-sign-out-alt"></i><span class="text">Logout</span><i class="chevron fas fa-chevron-right"></i></a></div>
        </div>
    </div>
    
    <!-- PREMIUM PLANS PAGE -->
    <div id="premium-plans-page" class="page-container hidden">
        <div class="page-header centered-header">
            <h1 class="gold-text"><i class="fas fa-crown"></i> Premium Plans</h1>
        </div>
        <div style="padding: 15px;">
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 20px;">
                Unlock all movies and series. No Ads. High Quality.
            </p>
            <div id="plans-container">
                <!-- Plans will be loaded here -->
                <div class="empty-state"><p>Loading Plans...</p></div>
            </div>
        </div>
    </div>

    <!-- PAYMENT MODAL -->
    <div id="payment-modal">
        <div class="page-header">
            <h1>Payment</h1>
            <button class="back-btn" style="display:block; position:static;" onclick="closePaymentModal()"><i class="fas fa-times"></i></button>
        </div>
        <div style="text-align: center;">
            <p>Scan QR to Pay <span class="gold-text" id="pay-amount"></span></p>
            <div class="qr-container">
                <img id="pay-qr-img" src="" alt="QR Code">
            </div>
            <p style="margin-bottom: 10px;">UPI ID: <span id="pay-upi-id" style="font-weight:bold; color:white;"></span> <button class="copy-btn" onclick="copyUPI()">COPY</button></p>
            
            <div class="auth-form" style="max-width: 100%; margin-top: 20px;">
                <p style="text-align: left; margin-bottom: 10px; font-size: 14px;">After payment, enter Transaction/UTR ID:</p>
                <div class="input-group">
                    <input type="text" id="payment-utr" class="auth-input" placeholder="Enter UTR / Ref Number" required>
                </div>
                <input type="hidden" id="selected-plan-name">
                <input type="hidden" id="selected-plan-days">
                <input type="hidden" id="selected-plan-price">
                <button onclick="submitPayment()" class="auth-btn" style="background: var(--premium-gold); color: black;">Submit Request</button>
            </div>
        </div>
    </div>

    <!-- NEW REDEEM CODE PAGE -->
    <div id="redeem-code-page" class="page-container hidden form-page">
        <div class="auth-form">
            <h1>Redeem Code</h1>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 20px;">Enter your premium code below to activate VIP access.</p>
            <div class="input-group">
                <input type="text" id="redeem-code-input" class="auth-input" placeholder="e.g., AB12CD34" required>
            </div>
            <button class="auth-btn" onclick="redeemCode()">Redeem</button>
        </div>
    </div>

    <div id="themes-page" class="page-container hidden">
        <div class="page-header centered-header"><h1>Themes & Appearance</h1></div>
        <div class="theme-section">
            <div class="theme-section-header">
                <h2 class="theme-section-title">Mode</h2>
                <label class="mode-toggle">
                    <label class="switch">
                        <input type="checkbox" id="mode-switch">
                        <span class="slider"></span>
                    </label>
                </label>
            </div>
        </div>
        <div class="theme-section">
            <div class="theme-section-header">
                <h2 class="theme-section-title">Color Themes</h2>
            </div>
            <div class="theme-grid" id="theme-grid-container">
                <div class="theme-option active" id="theme-classic-red" data-theme="classic-red" tabindex="0">
                    <div class="theme-preview"><div class="color-1"></div><div class="color-2"></div></div>
                    <p class="theme-name">Classic Red</p>
                </div>
                <div class="theme-option" id="theme-ocean-blue" data-theme="ocean-blue" tabindex="0">
                    <div class="theme-preview"><div class="color-1"></div><div class="color-2"></div></div>
                    <p class="theme-name">Ocean Blue</p>
                </div>
                <div class="theme-option" id="theme-forest-green" data-theme="forest-green" tabindex="0">
                    <div class="theme-preview"><div class="color-1"></div><div class="color-2"></div></div>
                    <p class="theme-name">Forest Green</p>
                </div>
                <div class="theme-option" id="theme-royal-purple" data-theme="royal-purple" tabindex="0">
                    <div class="theme-preview"><div class="color-1"></div><div class="color-2"></div></div>
                    <p class="theme-name">Royal Purple</p>
                </div>
                 <div class="theme-option" id="theme-sunset-orange" data-theme="sunset-orange" tabindex="0">
                    <div class="theme-preview"><div class="color-1"></div><div class="color-2"></div></div>
                    <p class="theme-name">Sunset Orange</p>
                </div>
                <div class="theme-option" id="theme-cyber-pink" data-theme="cyber-pink" tabindex="0">
                    <div class="theme-preview"><div class="color-1"></div><div class="color-2"></div></div>
                    <p class="theme-name">Cyber Pink</p>
                </div>
            </div>
        </div>
    </div>
    
    <div id="privacy-page" class="page-container hidden">
        <div class="page-header centered-header"><h1>Privacy Policy</h1></div>
        <div class="static-page-content">
            <h2>Information We Collect</h2>
            <p>We may collect personal information that you provide to us, such as your name, email address, and profile picture when you create an account.</p>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to operate, maintain, and provide to you the features and functionality of the Service. We may use your email address to send you Service-related notices.</p>
            <h2>Data Security</h2>
            <p>We care about the security of your information and use commercially reasonable safeguards to preserve the integrity and security of all information collected through the Service.</p>
            <p><strong>Last Updated: [Date]</strong></p>
        </div>
    </div>

    <div id="help-page" class="page-container hidden">
        <div class="page-header centered-header"><h1>Help & Support</h1></div>
        <div class="static-page-content">
            <h2>Frequently Asked Questions</h2>
            <p><strong>How do I request a movie?</strong><br>You can request a movie by going to your Profile page and tapping on "Movie Request". Fill in the details and submit.</p>
            <p><strong>How does Watch History work?</strong><br>Your watch history is automatically updated whenever you start playing a movie or show. You can view it from your Profile page.</p>
            <h2>Contact Us</h2>
            <p>If you have any other questions or need further assistance, please feel free to contact our support team at:<br><strong>[Your Support Email Here]</strong></p>
        </div>
    </div>
    
    <div id="history-page" class="page-container hidden">
        <div class="page-header centered-header"><h1>Watch History</h1></div>
        <div id="history-container" class="watchlist-container-pro"></div>
    </div>

    <div id="movie-request-page" class="page-container hidden form-page">
         <div class="auth-form">
            <h1>Request a Movie</h1>
            <form id="movie-request-form">
                <div class="input-group"><input type="text" id="request-movie-name" class="auth-input" placeholder="Movie Name" required></div>
                <div class="input-group"><input type="number" id="request-movie-year" class="auth-input" placeholder="Year of Release (e.g., 2023)"></div>
                <button type="submit" class="auth-btn">Submit Request</button>
            </form>
        </div>
    </div>
    <div id="account-settings-page" class="page-container hidden form-page">
        <div class="auth-form">
            <h1>Account Settings</h1>
            <form id="account-settings-form">
                <div class="input-group"><input type="text" id="settings-name" class="auth-input" placeholder="Full Name" required></div>
                <div class="input-group"><input type="email" id="settings-email" class="auth-input" placeholder="Email Address" readonly></div>
                <p style="font-size: 12px; color: var(--text-secondary); text-align: center; margin-top: -10px; margin-bottom: 20px;">Email cannot be changed.</p>
                
                <div class="input-group">
                    <p class="settings-label">Gender</p>
                    <div class="gender-radio-group">
                        <label>
                            <input type="radio" name="gender" value="male">
                            <span class="gender-radio-label">Male</span>
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female">
                            <span class="gender-radio-label">Female</span>
                        </label>
                    </div>
                </div>

                <button type="submit" class="auth-btn">Save Changes</button>
            </form>
        </div>
    </div>
    <div class="detail-page" id="detail-page"><div class="detail-backdrop" id="detail-backdrop"></div><div class="detail-content"><h1 class="detail-title" id="detail-title"></h1> <div class="detail-meta" id="detail-meta"></div><div class="detail-actions"> <button class="btn-play-full" id="play-btn"> <i class="fas fa-play"></i> <span>PLAY</span> </button> </div><div class="storyline-wrapper"> <p class="detail-storyline" id="detail-storyline"></p> </div><div class="secondary-actions-container"><div class="action-icon-btn" id="detail-trailer-btn" tabindex="0"> <i class="fas fa-video"></i> <span>Trailer</span> </div><div class="action-icon-btn" id="detail-watchlist-btn" tabindex="0"> <i class="fas fa-plus"></i> <span>My List</span> </div><div class="action-icon-btn" id="detail-share-btn" tabindex="0"> <i class="fas fa-share"></i> <span>Share</span> </div></div><div class="cast-section" id="detail-cast-section"> <div class="category-header" style="padding: 0; margin-bottom: 20px;"> <h2 class="category-title" style="font-size: 16px;">Cast</h2> </div> <div class="cast-list" id="detail-cast-list"></div> </div><div class="category-section" id="similar-section"> <div class="category-header" style="padding: 0;"> <h2 class="category-title">More Like This</h2> </div> <div class="content-slider" id="similar-slider"></div> </div></div></div>

    <div class="detail-page" id="series-detail-page">
        <div class="series-header">
            <img id="series-header-backdrop" class="series-header-backdrop" src="" alt="">
            <div class="series-header-overlay">
                <div class="series-header-content">
                    <h1 class="detail-title" id="series-detail-title"></h1>
                    <div class="detail-meta" id="series-detail-meta"></div>
                </div>
            </div>
        </div>
        <div class="detail-content">
            <div class="storyline-wrapper"> <p class="detail-storyline" id="series-detail-storyline"></p> </div>
            <div class="secondary-actions-container">
                 <div class="action-icon-btn" id="series-detail-watchlist-btn" tabindex="0"> <i class="fas fa-plus"></i> <span>My List</span> </div>
                 <div class="action-icon-btn" id="series-detail-share-btn" tabindex="0"> <i class="fas fa-share"></i> <span>Share</span> </div>
            </div>
        </div>
        
        <div id="series-episodes-section" class="category-section"></div>
        <div id="series-cast-section" class="category-section">
            <div class="category-header"><h2 class="category-title">Top Billed Cast</h2></div>
            <div class="cast-list" id="series-detail-cast-list"></div>
        </div>
        <div id="series-similar-section" class="category-section">
             <div class="category-header"><h2 class="category-title">More Like This</h2></div>
            <div class="content-slider" id="series-similar-slider"></div>
        </div>
    </div>
    
    <div class="player-page" id="movie-player-page">
        <div class="player-wrapper">
            <button class="player-back-btn" onclick="exitPlayerAndGoBack()"><i class="fas fa-arrow-left"></i></button>
            <div class="player-loading-overlay"><div class="plyr__spinner"></div></div>
            <video id="movie-player-element" playsinline preload="auto"></video>
            <iframe id="movie-player-iframe" class="player-iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
            <!-- Professional Player Overlays -->
            <div class="double-tap-overlay left">
                <div class="tap-icon-group">
                    <i class="fas fa-backward"></i>
                    <span class="tap-text">10s</span>
                </div>
            </div>
            <div class="double-tap-overlay right">
                 <div class="tap-icon-group">
                    <i class="fas fa-forward"></i>
                    <span class="tap-text">10s</span>
                </div>
            </div>
            <div class="video-overlay-feedback">
                <i class="fas fa-volume-up"></i>
                <span class="feedback-text">50%</span>
            </div>

            <div class="player-error-overlay">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Could not play video.</p>
                <button class="error-back-btn" onclick="exitPlayerAndGoBack()">Go Back</button>
            </div>
        </div>
        <div class="movie-player-info">
            <h1 class="movie-player-title" id="movie-player-title"></h1>
            <div class="secondary-actions-container" id="movie-player-actions" style="margin-bottom: 20px;">
                <button class="action-icon-btn" id="player-like-btn"> <i class="far fa-thumbs-up"></i> <span class="action-count" id="player-like-count">0</span> </button>
                <button class="action-icon-btn" id="player-dislike-btn"> <i class="far fa-thumbs-down"></i> <span class="action-count" id="player-dislike-count">0</span> </button>
                <button class="action-icon-btn" id="player-watchlist-btn"> <i class="fas fa-plus"></i><span>My List</span> </button>
                <button class="action-icon-btn" id="player-share-btn"> <i class="fas fa-share"></i><span>Share</span> </button>
            </div>
            <div class="autoplay-toggle-wrapper">
                <div class="autoplay-toggle">
                    <span>Autoplay</span>
                    <label class="switch">
                        <input type="checkbox" id="movie-autoplay-switch" checked>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="movie-player-suggestions category-section">
                <div class="category-header" style="padding: 0;"><h2 class="category-title" style="font-size: 18px;">More Like This</h2></div>
                <div class="content-slider" id="movie-player-similar-slider"></div>
            </div>
        </div>
    </div>
    
    <div class="player-page" id="series-player-page">
        <div class="player-wrapper">
            <button class="player-back-btn" onclick="exitPlayerAndGoBack()"><i class="fas fa-arrow-left"></i></button>
            <div class="player-loading-overlay"><div class="plyr__spinner"></div></div>
            <video id="series-player-element" playsinline preload="auto"></video>
            <iframe id="series-player-iframe" class="player-iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
            <!-- Professional Player Overlays -->
             <div class="double-tap-overlay left">
                <div class="tap-icon-group">
                    <i class="fas fa-backward"></i>
                    <span class="tap-text">10s</span>
                </div>
            </div>
            <div class="double-tap-overlay right">
                 <div class="tap-icon-group">
                    <i class="fas fa-forward"></i>
                    <span class="tap-text">10s</span>
                </div>
            </div>
            <div class="video-overlay-feedback">
                <i class="fas fa-volume-up"></i>
                <span class="feedback-text">50%</span>
            </div>

             <div class="player-error-overlay">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Could not load this episode.</p>
                <button class="error-back-btn" onclick="exitPlayerAndGoBack()">Go Back</button>
            </div>
        </div>
        <div class="movie-player-info">
            <h1 class="movie-player-title" id="series-player-title"></h1>
            <div class="secondary-actions-container" id="series-player-actions">
                <button class="action-icon-btn" id="series-player-like-btn"> <i class="far fa-thumbs-up"></i> <span class="action-count" id="series-player-like-count">0</span> </button>
                <button class="action-icon-btn" id="series-player-dislike-btn"> <i class="far fa-thumbs-down"></i> <span class="action-count" id="series-player-dislike-count">0</span> </button>
                <button class="action-icon-btn" id="series-player-watchlist-btn"> <i class="fas fa-plus"></i><span>My List</span> </button>
                <button class="action-icon-btn" id="series-player-share-btn"> <i class="fas fa-share"></i><span>Share</span> </button>
            </div>
            <div class="episodes-header">
                <h3>All Episodes</h3>
                <div class="autoplay-toggle">
                    <span>Autoplay</span>
                    <label class="switch">
                        <input type="checkbox" id="series-autoplay-switch" checked>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div id="series-player-episode-list">
            </div>
        </div>
    </div>

    <div class="player-page" id="livetv-player-page">
        <div class="player-wrapper" id="livetv-player-wrapper">
            <button class="player-back-btn" onclick="exitPlayerAndGoBack()"><i class="fas fa-arrow-left"></i></button>
            <div class="player-loading-overlay"><div class="plyr__spinner"></div></div>
            <div class="player-error-overlay">
                <i class="fas fa-broadcast-tower"></i>
                <p>This Channel Maintenance</p>
                <button class="error-back-btn" onclick="exitPlayerAndGoBack()">Go Back</button>
            </div>
            <video id="livetv-player-element" playsinline></video>
            <iframe id="livetv-player-iframe" class="player-iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div id="livetv-player-placeholder" class="livetv-player-placeholder">
                <i class="fas fa-tv"></i>
                <p>Select a Channel to Begin</p>
            </div>
        </div>
        <div class="livetv-player-info">
            <h1 class="movie-player-title" id="livetv-player-title">Select a Channel</h1>
            <div class="secondary-actions-container" id="livetv-player-actions" style="margin-bottom: 20px;">
                <button class="action-icon-btn" id="livetv-player-like-btn">
                    <i class="far fa-thumbs-up"></i>
                    <span class="action-count" id="livetv-player-like-count">0</span>
                </button>
                <button class="action-icon-btn" id="livetv-player-dislike-btn">
                    <i class="far fa-thumbs-down"></i>
                    <span class="action-count" id="livetv-player-dislike-count">0</span>
                </button>
                <button class="action-icon-btn" id="livetv-player-share-btn">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
            <div class="category-section">
                <div class="category-header" style="padding: 0;">
                    <h2 class="category-title" style="font-size: 18px;">More Channels</h2>
                </div>
                <div class="content-slider" id="livetv-player-more-channels-slider"></div>
            </div>
        </div>
    </div>

    <!-- SHORTS PAGE -->
    <div id="shorts-page" class="page-container hidden" style="height: 100vh; overflow: hidden; background: #000; padding-bottom: 0;">
        <div class="shorts-header" style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
            <h2 style="color: white; font-weight: 700; text-shadow: 0 0 10px var(--primary-glow);">Shorts</h2>
            <i class="fas fa-search" style="color: white; font-size: 20px; cursor: pointer;" onclick="navigateTo('search')"></i>
        </div>
        <div id="shorts-container" class="shorts-swiper" style="height: 100%; width: 100%; overflow-y: scroll; scroll-snap-type: y mandatory; -webkit-overflow-scrolling: touch; scroll-behavior: smooth;">
            <!-- Dynamic short cards will be inserted here -->
        </div>
    </div>

    <!-- SHORTS PLAYER PAGE (FULLSCREEN SWIPE) -->
    <div id="shorts-player-page" class="player-page" style="display: none; background: #000; height: 100vh; width: 100%;">
        <div class="shorts-player-container" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
            <button class="player-back-btn" onclick="exitShortsPlayer()" style="z-index: 30;"><i class="fas fa-arrow-left"></i></button>
            <div id="shorts-player-list" style="height: 100%; width: 100%; overflow-y: scroll; scroll-snap-type: y mandatory; -webkit-overflow-scrolling: touch; scroll-behavior: smooth;">
                <!-- Dynamic player cards will be inserted here -->
            </div>
        </div>
    </div>

    <div class="search-page" id="search-page">
        <div class="search-header">
            <button class="back-btn-search" onclick="goBack()"><i class="fas fa-arrow-left"></i></button>
            <h1>Search</h1>
        </div>
        <div class="search-input-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input type="text" class="search-input-full" id="global-search-input" placeholder="Search for movies, series, genres...">
            <button class="search-clear-btn hidden" id="search-clear-btn" onclick="clearSearchInput()"><i class="fas fa-times-circle"></i></button>
        </div>
        <div class="search-content-wrapper">
            <div id="search-initial-state">
                <div class="search-suggestions-group" id="recent-searches-container">
                    <div class="suggestion-header">
                        <h3 class="suggestion-title"><i class="fas fa-history"></i> Recent Searches</h3>
                        <button class="clear-btn" onclick="clearAllRecentSearches()">Clear All</button>
                    </div>
                    <div id="recent-searches-list"></div>
                </div>
                <div class="search-suggestions-group" id="popular-categories-container">
                    <div class="suggestion-header">
                        <h3 class="suggestion-title"><i class="fas fa-tag"></i> Popular Categories</h3>
                    </div>
                    <div class="suggestion-tags-container" id="popular-categories-list"></div>
                </div>
            </div>
            <div class="search-results-container hidden" id="search-results-container"></div>
        </div>
    </div>

    <nav class="bottom-nav" id="bottom-nav">
        <button class="nav-item" id="nav-home" onclick="navigateTo('home')" tabindex="0"><i class="fas fa-home"></i> Home</button>
        <button class="nav-item" id="nav-series" onclick="navigateTo('series')" tabindex="0"><i class="fas fa-tv"></i> Series</button>
        <button class="nav-item" id="nav-shorts" onclick="navigateTo('shorts')" tabindex="0"><i class="fas fa-clapperboard"></i> Shorts</button>
        <button class="nav-item" id="nav-livetv" onclick="navigateTo('livetv')" tabindex="0"><i class="fas fa-broadcast-tower"></i> TV</button>
        <button class="nav-item" id="nav-watchlist" onclick="navigateTo('watchlist')" tabindex="0"><i class="fas fa-bookmark"></i> Watchlist</button>
        <button class="nav-item" id="nav-profile" onclick="navigateTo('profile')" tabindex="0"><i class="fas fa-user"></i> Profile</button>
    </nav>
    <div class="trailer-modal" id="trailer-modal"><button class="trailer-close-btn" onclick="closeTrailer()">&times;</button><div class="trailer-video-wrapper"> <iframe id="trailer-iframe" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </div></div>
    <div id="toast-notification" class="toast-notification"></div>
    
    <div class="modal-backdrop" id="modal-backdrop"></div>
    <div id="gender-choice-modal">
        <h3>Choose Your Identity</h3>
        <div class="gender-choices">
            <button class="gender-btn" data-gender="male"><i class="fas fa-mars"></i><span>Male</span></button>
            <button class="gender-btn" data-gender="female"><i class="fas fa-venus"></i><span>Female</span></button>
        </div>
    </div>
    <div id="avatar-change-modal">
        <h3 id="avatar-modal-title">Choose a New Avatar</h3>
        <div class="avatar-choices" id="modal-avatar-choices"></div>
    </div>

    <!-- AD OVERLAY CONTAINER -->
    <div id="ad-overlay">
        <div id="ad-controls">
            <div id="ad-timer">Ad: 5s</div>
            <button id="ad-skip-btn" class="hidden">Skip</button>
        </div>
        <div id="ad-media-container">
            <!-- Dynamic Image or Video -->
        </div>
        <button id="ad-visit-btn">Visit Advertiser</button>
    </div>

</div>
<script>
    const firebaseConfig = {
  apiKey: "AIzaSyDH7d_mfsUJgHIMDxi3p1MjGOHR0t_T6NA",
  authDomain: "app-seller-8980c.firebaseapp.com",
  databaseURL: "https://app-seller-8980c-default-rtdb.firebaseio.com",
  projectId: "app-seller-8980c",
  storageBucket: "app-seller-8980c.firebasestorage.app",
  messagingSenderId: "275124357254",
  appId: "1:275124357254:web:63cc537b62f76e67f92907"
};

    // CURRENT APP VERSION CODE (Update this when releasing new APK)
    const CURRENT_VERSION_CODE = 1;

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const auth = firebase.auth();
    
    const maintenancePage = document.getElementById('maintenance-page');
    const bannedPage = document.getElementById('banned-page');
    const updateModal = document.getElementById('update-modal');
    const loadingPage = document.getElementById('loading-page');
    const authContainer = document.getElementById('auth-container');
    const appWrapper = document.getElementById('app-wrapper');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const guestLoginBtn = document.getElementById('guest-login-btn');

    let maleAvatars = [], femaleAvatars = [];
    let allContent = [], currentContent = null, sliderInterval = null, currentSlide = 0; 
    let watchlist = JSON.parse(localStorage.getItem('nareshworld_watchlist')) || []; 
    let recentSearches = JSON.parse(localStorage.getItem('nareshworld_recent_searches')) || []; 
    let navigationHistory = ['home']; 
    let allLiveTvChannels = [], allCategories = []; 
    let allNotifications = []; 
    let lastSeenNotifTimestamp = localStorage.getItem('nareshworld_last_notif_ts') || 0; 
    let dismissedNotifications = JSON.parse(localStorage.getItem('nareshworld_dismissed_notifs')) || [];
    let joinTimeInterval = null;
    let liveTvPlayer = null; 
    let moviePlayer = null; 
    let seriesPlayer = null;
    let hlsInstance = null;
    let newUserSignupData = null;
    let autoplayTimeout = null;
    let moviePlayerSimilarContent = [];
    
    // PREMIUM VARIABLES
    let isPremiumUser = false;
    let subscriptionData = null;

    // ADS VARIABLES
    let activeAds = [];
    let adTimerInterval = null;
    
    // WATCH PROGRESS LOCAL STORAGE KEY
    const WATCH_PROGRESS_KEY = 'nareshworld_watch_progress';

    // SHORTS VARIABLES
    let allShorts = [];
    let currentShortIndex = 0;
    let shortsPlayerList = document.getElementById('shorts-player-list');
    let shortsContainer = document.getElementById('shorts-container');
    let activeShortVideos = new Set(); // Track playing videos

    const playerConfig = {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        tooltips: { controls: true, seek: true },
        previewThumbnails: { enabled: true, src: '' },
        keyboard: { focused: true, global: true },
        autoplay: true,
        playsinline: true,
        clickToPlay: true
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('nareshworld_theme') || 'classic-red';
        const savedMode = localStorage.getItem('nareshworld_mode') || 'dark';
        applyTheme(savedTheme);
        applyMode(savedMode);
        setupThemeControls();
        
        document.getElementById('global-search-input').addEventListener('input', performSearch);
        document.getElementById('global-search-input').addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const term = event.target.value.trim();
                if (term) {
                    saveSearchTerm(term);
                }
            }
        });

        setupProfileAvatarChanger();
        setupSignupOnboardingModals();
        loadAdsData();
        checkAppUpdate();
    });
    
    // ===================================
    // 1. APP VERSION CONTROL LOGIC
    // ===================================
    function checkAppUpdate() {
        database.ref('app_settings/version').on('value', snapshot => {
            const data = snapshot.val();
            if (data && data.versionCode > CURRENT_VERSION_CODE && data.forceUpdate) {
                document.getElementById('update-btn-link').href = data.apkUrl || '#';
                updateModal.classList.remove('hidden');
                maintenancePage.classList.add('hidden');
                loadingPage.classList.add('hidden');
                authContainer.classList.add('hidden');
                appWrapper.classList.add('hidden');
            } else {
                updateModal.classList.add('hidden');
            }
        });
    }

    // MAINTENANCE CHECKER
    database.ref('maintenance').on('value', snapshot => {
        const settings = snapshot.val();
        if (!updateModal.classList.contains('hidden')) return;

        if (settings && settings.enabled) {
            document.getElementById('maintenance-message-text').textContent = settings.message || 'The app is currently down for maintenance. Please check back later.';
            maintenancePage.classList.remove('hidden');
            loadingPage.classList.add('hidden');
            authContainer.classList.add('hidden');
            appWrapper.classList.add('hidden');
        } else {
            maintenancePage.classList.add('hidden');
            checkAuthState();
        }
    });

    function loadAvatarOptionsFromDB() {
        database.ref('app_settings/avatars').once('value').then(snapshot => {
            const avatars = snapshot.val();
            if (avatars) {
                maleAvatars = avatars.male ? Object.values(avatars.male) : [];
                femaleAvatars = avatars.female ? Object.values(avatars.female) : [];
            }
        }).catch(error => {
            console.error("Could not load avatars:", error);
            maleAvatars = ["https://i.ibb.co/yBNK21P/avatar1.jpg", "https://i.ibb.co/n6p2WfD/avatar2.jpg"];
            femaleAvatars = ["https://i.ibb.co/rKwsYPQ/9439775.jpg", "https://i.ibb.co/Cgs2zkg/9439767.jpg"];
        });
    }

    function loadAdsData() {
        database.ref('ads').on('value', snapshot => {
            const adsData = snapshot.val();
            activeAds = [];
            if (adsData) {
                Object.keys(adsData).forEach(key => {
                    const ad = adsData[key];
                    if (ad.isActive) {
                        activeAds.push({ id: key, ...ad });
                    }
                });
            }
        });
    }

    // ===================================
    // 2. UPDATED AUTH & BAN CHECK
    // ===================================
    function checkAuthState() {
        auth.onAuthStateChanged(user => { 
            if (newUserSignupData) return;
            if (user) { 
                if (!user.isAnonymous) {
                     listenForBan(user.uid);
                }

                authContainer.classList.add('hidden'); 
                appWrapper.classList.remove('hidden'); 
                updateUserProfileUI(user); 
                handleGuestUI(user.isAnonymous);
                loadContent(); 
                loadNotifications(user);
                loadAvatarOptionsFromDB(); 
                checkPremiumStatus(user.uid);
                loadShorts(); // Load shorts data
            } else { 
                authContainer.classList.remove('hidden'); 
                appWrapper.classList.add('hidden'); 
                allContent = []; watchlist = []; allNotifications = [];
                isPremiumUser = false;
                if(joinTimeInterval) clearInterval(joinTimeInterval);
                hideLoadingScreen();
            } 
        });
    }
    
    function listenForBan(uid) {
        database.ref(`users/${uid}/isBanned`).on('value', snapshot => {
            const isBanned = snapshot.val();
            if (isBanned === true) {
                bannedPage.classList.remove('hidden');
                loadingPage.classList.add('hidden');
                authContainer.classList.add('hidden');
                appWrapper.classList.add('hidden');
            } else {
                bannedPage.classList.add('hidden');
            }
        });
    }
    
    function checkPremiumStatus(uid) {
        database.ref(`users/${uid}/subscription`).on('value', snapshot => {
            const sub = snapshot.val();
            if (sub && sub.isPremium && sub.expiryDate > Date.now()) {
                isPremiumUser = true;
                subscriptionData = sub;
                document.querySelector('.profile-avatar-pro').style.borderColor = 'var(--premium-gold)';
                if (!document.querySelector('.profile-name .fa-crown')) {
                    document.querySelector('.profile-name').innerHTML += ' <i class="fas fa-crown gold-text" style="font-size: 16px;"></i>';
                }
            } else {
                isPremiumUser = false;
                subscriptionData = null;
            }
        });
    }

    function handleGuestUI(isGuest) {
        const accountSettingsLink = document.getElementById('account-settings-link');
        const movieRequestLink = document.getElementById('movie-request-link');
        const redeemCodeLink = document.getElementById('redeem-code-link');
        const changeAvatarBtn = document.getElementById('change-avatar-btn');

        if (isGuest) {
            if (accountSettingsLink) accountSettingsLink.style.display = 'none';
            if (movieRequestLink) movieRequestLink.style.display = 'none';
            if (redeemCodeLink) redeemCodeLink.style.display = 'none';
            if (changeAvatarBtn) changeAvatarBtn.style.display = 'none';
        } else {
            if (accountSettingsLink) accountSettingsLink.style.display = 'flex';
            if (movieRequestLink) movieRequestLink.style.display = 'flex';
            if (redeemCodeLink) redeemCodeLink.style.display = 'flex';
            if (changeAvatarBtn) changeAvatarBtn.style.display = 'flex';
        }
    }

    function hideLoadingScreen() { loadingPage.classList.add('fade-out'); setTimeout(() => { loadingPage.style.display = 'none'; }, 500); }
    
    loginForm.addEventListener('submit', (e) => { e.preventDefault(); const email = document.getElementById('login-email').value; const password = document.getElementById('login-password').value; const errorEl = document.getElementById('login-error'); auth.signInWithEmailAndPassword(email, password).catch(error => { errorEl.textContent = error.message; errorEl.style.display = 'block'; }); });
    
    guestLoginBtn.addEventListener('click', () => {
        auth.signInAnonymously().catch(error => {
            console.error("Guest login failed:", error);
            const errorEl = document.getElementById('login-error');
            errorEl.textContent = "Could not log in as guest. Please enable Anonymous Sign-in in your Firebase console.";
            errorEl.style.display = 'block';
        });
    });

    signupForm.addEventListener('submit', (e) => { 
        e.preventDefault(); 
        const name = document.getElementById('signup-name').value; 
        const email = document.getElementById('signup-email').value; 
        const password = document.getElementById('signup-password').value; 
        const errorEl = document.getElementById('signup-error'); 
        
        auth.createUserWithEmailAndPassword(email, password).then(userCredential => { 
            const user = userCredential.user; 
            startSignupOnboarding(user, name, email);
        }).catch(error => { 
            errorEl.textContent = error.message; 
            errorEl.style.display = 'block'; 
        }); 
    });

    function startSignupOnboarding(user, name, email) {
        newUserSignupData = { user, name, email };
        authContainer.classList.add('hidden');
        document.getElementById('modal-backdrop').classList.add('show');
        document.getElementById('gender-choice-modal').classList.add('show');
    }

    function setupSignupOnboardingModals() {
        document.querySelectorAll('#gender-choice-modal .gender-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!newUserSignupData) return;
                
                const gender = e.currentTarget.dataset.gender;
                newUserSignupData.gender = gender;

                const genderModal = document.getElementById('gender-choice-modal');
                const avatarModal = document.getElementById('avatar-change-modal');
                const avatarArray = gender === 'male' ? maleAvatars : femaleAvatars;
                
                document.getElementById('avatar-modal-title').textContent = `Choose a ${gender.charAt(0).toUpperCase() + gender.slice(1)} Avatar`;
                populateAvatarChoices('modal-avatar-choices', avatarArray);
                
                genderModal.classList.remove('show');
                avatarModal.classList.add('show');
            });
        });

        document.getElementById('modal-avatar-choices').addEventListener('click', (e) => {
            if (!newUserSignupData) return;
            
            const choice = e.target.closest('.avatar-choice');
            if (!choice) return;

            const avatarUrl = choice.dataset.avatar;
            const { user, name, email, gender } = newUserSignupData;

            user.updateProfile({ 
                displayName: name, 
                photoURL: avatarUrl 
            }).then(() => {
                return database.ref('users/' + user.uid).set({ 
                    displayName: name, 
                    email: email, 
                    photoURL: avatarUrl,
                    gender: gender,
                    isBanned: false,
                    createdAt: firebase.database.ServerValue.TIMESTAMP 
                });
            }).then(() => {
                newUserSignupData = null;
                document.getElementById('avatar-change-modal').classList.remove('show');
                document.getElementById('modal-backdrop').classList.remove('show');
                checkAuthState();
            }).catch(error => {
                showToast("Error creating profile: " + error.message);
                console.error("Signup finalization error:", error);
                newUserSignupData = null;
                auth.signOut();
            });
        });
    }

    function handleLogout() { if(joinTimeInterval) clearInterval(joinTimeInterval); auth.signOut(); }
    function toggleAuthForms() { document.getElementById('login-page-pro').classList.toggle('hidden'); document.getElementById('signup-page-pro').classList.toggle('hidden'); document.getElementById('login-error').style.display = 'none'; document.getElementById('signup-error').style.display = 'none'; }
    function togglePasswordVisibility(inputId, icon) { const input = document.getElementById(inputId); if (input.type === "password") { input.type = "text"; icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash'); } else { input.type = "password"; icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye'); } }
    
    function updateUserProfileUI(user) { 
        if (!user) return; 
        
        if (user.isAnonymous) {
            document.getElementById('profile-user-name').textContent = 'Guest User';
            document.getElementById('profile-user-email').textContent = 'Sign up for a full experience!';
            document.getElementById('profile-avatar-container').innerHTML = `<img src="https://i.ibb.co/FkdVCKQb/1001809860.jpg" alt="Guest Avatar">`;
            document.getElementById('joining-date-stat').textContent = 'Just now';
            if (joinTimeInterval) clearInterval(joinTimeInterval);
            return;
        }

        const userName = user.displayName || user.email.split('@')[0]; 
        const userEmail = user.email; 
        const userAvatar = user.photoURL || "https://i.ibb.co/yBNK21P/avatar1.jpg";
        document.getElementById('profile-user-name').textContent = userName; 
        document.getElementById('profile-user-email').textContent = userEmail; 
        const avatarContainer = document.getElementById('profile-avatar-container'); 
        avatarContainer.innerHTML = `<img src="${userAvatar}" alt="Profile Avatar">`; 
        
        if (joinTimeInterval) clearInterval(joinTimeInterval);
        const creationTime = new Date(user.metadata.creationTime).getTime();
        const statElement = document.getElementById('joining-date-stat');

        function updateJoinTime() {
            const now = Date.now();
            const msPerDay = 1000 * 60 * 60 * 24;
            const elapsed = now - creationTime;
            const days = Math.floor(elapsed / msPerDay);
            
            if (days > 1) {
                statElement.textContent = `${days} days`;
            } else if (days === 1) {
                 statElement.textContent = `1 day`;
            } else {
                statElement.textContent = `Today`;
            }
        }
        updateJoinTime();
        joinTimeInterval = setInterval(updateJoinTime, 60000);
    }
    
    function populateAvatarChoices(containerId, avatarArray, selectedUrl = null) {
        const container = document.getElementById(containerId);
        if(!container) return;
        if (!avatarArray || avatarArray.length === 0) {
            container.innerHTML = `<p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">No avatars available for this gender.</p>`;
            return;
        }
        container.innerHTML = avatarArray.map(url => 
            `<div class="avatar-choice ${url === selectedUrl ? 'selected' : ''}" data-avatar="${url}"><img src="${url}" alt="Avatar"></div>`
        ).join('');
    }

    function setupProfileAvatarChanger() {
        const changeBtn = document.getElementById('change-avatar-btn');
        const genderModal = document.getElementById('gender-choice-modal');
        const avatarModal = document.getElementById('avatar-change-modal');
        const backdrop = document.getElementById('modal-backdrop');
        const choicesContainer = document.getElementById('modal-avatar-choices');
    
        const openGenderModal = () => { backdrop.classList.add('show'); genderModal.classList.add('show'); };
        const closeAllModals = () => { genderModal.classList.remove('show'); avatarModal.classList.remove('show'); backdrop.classList.remove('show'); };
        const showAvatarChoicesForGender = (gender) => {
            const user = auth.currentUser;
            if (!user) return;
            const avatarArray = gender === 'male' ? maleAvatars : femaleAvatars;
            document.getElementById('avatar-modal-title').textContent = `Choose a ${gender.charAt(0).toUpperCase() + gender.slice(1)} Avatar`;
            populateAvatarChoices('modal-avatar-choices', avatarArray, user.photoURL);
            genderModal.classList.remove('show');
            avatarModal.classList.add('show');
        };
    
        changeBtn.addEventListener('click', () => {
            if (newUserSignupData) return;
            const user = auth.currentUser;
            if (!user || user.isAnonymous) return;
            database.ref('users/' + user.uid + '/gender').once('value').then(snapshot => {
                const gender = snapshot.val();
                if (gender) { backdrop.classList.add('show'); showAvatarChoicesForGender(gender); } 
                else { openGenderModal(); }
            });
        });

        backdrop.addEventListener('click', closeAllModals);
        
        document.querySelectorAll('#gender-choice-modal .gender-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (newUserSignupData) return;
                const gender = e.currentTarget.dataset.gender;
                const user = auth.currentUser;
                if(user) { database.ref('users/' + user.uid).update({ gender: gender }); }
                showAvatarChoicesForGender(gender);
            });
        });
    
        choicesContainer.addEventListener('click', (e) => {
            if (newUserSignupData) return;
            const choice = e.target.closest('.avatar-choice');
            if (!choice) return;
            const newAvatarUrl = choice.dataset.avatar;
            const user = auth.currentUser;
            if (!user || user.photoURL === newAvatarUrl) { closeAllModals(); return; };
            user.updateProfile({ photoURL: newAvatarUrl }).then(() => {
                database.ref('users/' + user.uid).update({ photoURL: newAvatarUrl }).then(() => {
                    showToast("Avatar updated successfully!");
                    updateUserProfileUI(user);
                    closeAllModals();
                });
            }).catch(error => {
                showToast("Error updating avatar: " + error.message);
                closeAllModals();
            });
        });
    }

    async function shareContent(item) {
        if (!item) return;
        const shareData = { title: item.title || item.name, text: `Check out "${item.title || item.name}" on Naresh World !`, url: window.location.href };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.error('Error sharing content:', err); }
        } else {
            try { await navigator.clipboard.writeText(`${shareData.text} \n${shareData.url}`); showToast('Link copied to clipboard!'); } 
            catch (err) { showToast('Sharing not supported on this device.'); }
        }
    }
    
    function showToast(message) { const toast = document.getElementById('toast-notification'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => { toast.classList.remove('show'); }, 3000); }
    function loadNotifications(currentUser) { database.ref('notifications').orderByChild('timestamp').on('value', snapshot => { const userNotifications = []; snapshot.forEach(childSnapshot => { const notif = { id: childSnapshot.key, ...childSnapshot.val() }; if (dismissedNotifications.includes(notif.id)) { return; } if (notif.target === 'all' || (notif.target === 'specific' && notif.targetEmails && notif.targetEmails.includes(currentUser.email))) { userNotifications.push(notif); } }); allNotifications = userNotifications.reverse(); checkUnreadNotifications(); if(document.getElementById('notification-page').style.display === 'block') { renderNotificationsPage(); } }); }
    function checkUnreadNotifications() { const indicator = document.getElementById('unread-indicator'); if (allNotifications.length > 0 && allNotifications[0].timestamp > lastSeenNotifTimestamp) { indicator.classList.remove('hidden'); } else { indicator.classList.add('hidden'); } }
    function renderNotificationsPage() { const container = document.getElementById('notification-list-container'); container.innerHTML = ''; if (allNotifications.length === 0) { container.innerHTML = `<div class="empty-state" style="min-height: calc(100vh - 200px); display: flex; flex-direction: column; justify-content: center;"><i class="fas fa-bell-slash empty-icon"></i><p>No Notifications Yet</p><span>New updates will appear here.</span></div>`; return; } allNotifications.forEach(notif => { const cardWrapper = document.createElement('div'); cardWrapper.className = 'notification-card-wrapper'; cardWrapper.innerHTML = createNotificationCardHTML(notif); container.appendChild(cardWrapper); const cardElement = cardWrapper.querySelector('.notification-card'); addSwipeListeners(cardElement); }); if (allNotifications.length > 0) { lastSeenNotifTimestamp = allNotifications[0].timestamp; localStorage.setItem('nareshworld_last_notif_ts', lastSeenNotifTimestamp); checkUnreadNotifications(); } }
    function createNotificationCardHTML(notif) { const timeAgo = formatTimeAgo(notif.timestamp); const isUnread = notif.timestamp > lastSeenNotifTimestamp; let imageHTML = notif.moviePoster ? `<img src="${notif.moviePoster}" alt="Movie Poster">` : `<i class="fas ${notif.icon || 'fa-bell'} icon"></i>`; let footerHTML = notif.movieId ? `<button class="watch-now-btn" onclick="event.stopPropagation(); handleNotificationClick('${notif.id}', '${notif.movieId}')">Watch Now</button>` : '<div></div>'; return ` <div class="notification-card-actions"><button class="delete-btn" onclick="dismissNotification(this, '${notif.id}')"><i class="fas fa-trash-alt"></i></button></div> <div class="notification-card" data-id="${notif.id}" onclick="handleNotificationClick('${notif.id}', '${notif.movieId || ''}')"> <div class="notif-card-image">${imageHTML}</div> <div class="notif-card-content"> <div class="notif-card-header"> <h3>${notif.title}</h3> ${isUnread ? '<div class="unread-dot-card"></div>' : ''} </div> <p class="notif-card-message">${notif.message}</p> <div class="notif-card-footer"> <span class="time">${timeAgo}</span> ${footerHTML} </div> </div> </div>`; }
    function handleNotificationClick(notifId, movieId) { if (!movieId) return; const movie = allContent.find(m => m.id === movieId); if (movie) { showDetail(movie); } else { alert("Sorry, this movie could not be found."); } }
    function dismissNotification(btn, notifId) { const wrapper = btn.closest('.notification-card-wrapper'); if (!wrapper) return; if (!dismissedNotifications.includes(notifId)) { dismissedNotifications.push(notifId); localStorage.setItem('nareshworld_dismissed_notifs', JSON.stringify(dismissedNotifications)); } wrapper.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; wrapper.style.transform = 'scale(0.9)'; wrapper.style.opacity = '0'; setTimeout(() => { wrapper.remove(); allNotifications = allNotifications.filter(n => n.id !== notifId); if (allNotifications.length === 0) { renderNotificationsPage(); } }, 300); }
    function addSwipeListeners(card) { let startX, currentX, diffX = 0; const SWIPE_THRESHOLD = -80; card.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; card.style.transition = 'none'; }, { passive: true }); card.addEventListener('touchmove', (e) => { currentX = e.touches[0].clientX; diffX = currentX - startX; if (diffX < 0) { card.style.transform = `translateX(${diffX}px)`; } }, { passive: true }); card.addEventListener('touchend', () => { card.style.transition = 'transform 0.3s ease'; if (diffX < SWIPE_THRESHOLD) { card.style.transform = 'translateX(-100%)'; const dismissBtn = card.parentElement.querySelector('.delete-btn'); setTimeout(() => { if (dismissBtn) dismissBtn.click(); }, 100); } else { card.style.transform = 'translateX(0)'; } diffX = 0; }); }
    function formatTimeAgo(timestamp) { const now = new Date(); const seconds = Math.floor((now - timestamp) / 1000); let interval = seconds / 31536000; if (interval > 1) return Math.floor(interval) + " years ago"; interval = seconds / 2592000; if (interval > 1) return Math.floor(interval) + " months ago"; interval = seconds / 86400; if (interval > 1) return Math.floor(interval) + " days ago"; interval = seconds / 3600; if (interval > 1) return Math.floor(interval) + " hours ago"; interval = seconds / 60; if (interval > 1) return Math.floor(interval) + " minutes ago"; return Math.floor(seconds) + " seconds ago"; }
    
    function loadContent() { database.ref().on('value', snapshot => { const data = snapshot.val(); const webseries = data.webseries ? Object.keys(data.webseries).map(key => ({ id: key, ...data.webseries[key], type: 'webseries' })) : []; const movies = data.movies ? Object.keys(data.movies).map(key => ({ id: key, ...data.movies[key], type: 'movie' })) : []; allContent = [...webseries, ...movies].sort((a, b) => b.timestamp - a.timestamp); allLiveTvChannels = data.livetv ? Object.keys(data.livetv).map(key => ({ id: key, ...data.livetv[key], type: 'livetv' })) : []; if (data.categories) { allCategories = Object.values(data.categories).sort((a, b) => a.order - b.order).map(cat => cat.name); } else { allCategories = ['Bollywood', 'Hollywood', 'South Indian', 'Anime'].sort(); } const moviePlayerActive = document.getElementById('movie-player-page').style.display === 'flex'; const liveTvPlayerActive = document.getElementById('livetv-player-page').style.display === 'flex'; if (moviePlayerActive || liveTvPlayerActive) { return; } const currentNav = navigationHistory[navigationHistory.length - 1] || 'home'; if (typeof currentNav === 'string' || (currentNav && currentNav.page)) { navigateTo(currentNav, true); } setTimeout(hideLoadingScreen, 1000); }); }

    function navigateTo(pageInfo, isFromHistory = false) {
        const page = (typeof pageInfo === 'object') ? pageInfo.page : pageInfo;
        const currentPageInfo = navigationHistory[navigationHistory.length - 1];
        if (!isFromHistory) {
             const isSamePage = (typeof currentPageInfo === 'object') 
                ? (currentPageInfo.page === page && currentPageInfo.category === pageInfo.category) 
                : currentPageInfo === page;
            if (!isSamePage) {
                if (navigationHistory.length > 5) navigationHistory.shift();
                navigationHistory.push(pageInfo);
            }
        }
        
        const allPages = ['home-page', 'detail-page', 'series-detail-page', 'movie-player-page', 'series-player-page', 'livetv-player-page', 'shorts-page', 'shorts-player-page', 'search-page', 'profile-page', 'notification-page', 'movie-request-page', 'account-settings-page', 'privacy-page', 'help-page', 'history-page', 'themes-page', 'premium-plans-page', 'redeem-code-page'];
        allPages.forEach(id => { 
            const el = document.getElementById(id); 
            if (el) { el.style.display = 'none'; if (el.classList.contains('page-container')) el.classList.add('hidden'); } 
        }); 
        
        document.getElementById('back-btn').style.display = 'none'; 
        document.getElementById('bottom-nav').style.display = 'flex'; 
        if (sliderInterval) clearInterval(sliderInterval); 
        
        const pageHeader = document.getElementById('page-header');
        pageHeader.classList.add('hidden'); 
        pageHeader.classList.remove('centered-header');
        pageHeader.querySelector('i').style.display = 'inline-block';
        
        const pagesWithMainHeader = ['home', 'series', 'livetv', 'watchlist'];
        if (pagesWithMainHeader.includes(page)) {
            document.getElementById('home-header').style.display = 'flex';
        } else {
            document.getElementById('home-header').style.display = 'none';
        }

        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active')); 
        const activeNavItem = document.getElementById(`nav-${page}`); 
        if (activeNavItem) activeNavItem.classList.add('active'); 
        
        const mainPagesWithNoBackBtn = ['home', 'series', 'watchlist', 'profile', 'livetv', 'shorts'];
        if (!mainPagesWithNoBackBtn.includes(page)) {
            document.getElementById('back-btn').style.display = 'block';
            document.getElementById('bottom-nav').style.display = 'none';
        }

        switch (page) { 
            case 'home': document.getElementById('home-page').style.display = 'block'; renderHomePage(); break; 
            case 'series': document.getElementById('home-page').style.display = 'block'; pageHeader.classList.add('hidden'); renderSeriesPage(); break;
            case 'search': document.getElementById('search-page').classList.add('active'); document.getElementById('search-page').style.display = 'flex'; document.getElementById('global-search-input').focus(); document.getElementById('global-search-input').value = ''; performSearch(); break; 
            case 'watchlist': document.getElementById('home-page').style.display = 'block'; pageHeader.classList.add('hidden'); renderWatchlistPage(); break; 
            case 'profile': document.getElementById('profile-page').classList.remove('hidden'); document.getElementById('profile-page').style.display = 'block'; break; 
            case 'livetv': document.getElementById('home-page').style.display = 'block'; pageHeader.classList.add('hidden'); renderLiveTvBrowsePage(); break;
            case 'shorts': document.getElementById('shorts-page').classList.remove('hidden'); document.getElementById('shorts-page').style.display = 'block'; renderShortsGrid(); break;
            case 'livetv-player': document.getElementById('livetv-player-page').style.display = 'flex'; document.getElementById('back-btn').style.display = 'none'; break;
            case 'notifications': document.getElementById('notification-page').classList.remove('hidden'); document.getElementById('notification-page').style.display = 'block'; document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active')); renderNotificationsPage(); break; 
            case 'movieRequest': document.getElementById('movie-request-page').classList.remove('hidden'); document.getElementById('movie-request-page').style.display = 'block'; renderMovieRequestPage(); break; 
            case 'accountSettings': document.getElementById('account-settings-page').classList.remove('hidden'); document.getElementById('account-settings-page').style.display = 'block'; renderAccountSettingsPage(); break;
            case 'themes': document.getElementById('themes-page').classList.remove('hidden'); document.getElementById('themes-page').style.display = 'block'; break;
            case 'privacy': document.getElementById('privacy-page').classList.remove('hidden'); document.getElementById('privacy-page').style.display = 'block'; break;
            case 'help': document.getElementById('help-page').classList.remove('hidden'); document.getElementById('help-page').style.display = 'block'; break;
            case 'history': document.getElementById('history-page').classList.remove('hidden'); document.getElementById('history-page').style.display = 'block'; renderHistoryPage(); break;
            case 'premium': document.getElementById('premium-plans-page').classList.remove('hidden'); document.getElementById('premium-plans-page').style.display = 'block'; renderPremiumPlans(); break;
            case 'redeemCode': document.getElementById('redeem-code-page').classList.remove('hidden'); document.getElementById('redeem-code-page').style.display = 'block'; break;
        } 
        if (page !== 'search') window.scrollTo(0, 0); 
    }
    
    window.addEventListener('scroll', () => { const header = document.getElementById('home-header'); if(header) { if (window.scrollY > 10) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); } } });
    function renderMovieRequestPage() { const form = document.getElementById('movie-request-form'); form.reset(); form.onsubmit = (e) => { e.preventDefault(); const movieName = document.getElementById('request-movie-name').value; const movieYear = document.getElementById('request-movie-year').value; const user = auth.currentUser; if (!user || user.isAnonymous) { showToast("Only logged-in users can send requests."); return; } if (!movieName) { showToast("Please enter a movie name."); return; } const requestData = { movieName: movieName, movieYear: movieYear, requestedBy: user.email, uid: user.uid, timestamp: firebase.database.ServerValue.TIMESTAMP }; database.ref('movie_requests').push(requestData).then(() => { showToast("Request submitted successfully!"); goBack(); }).catch(error => { showToast("Error: " + error.message); }); }; }
    
    function renderAccountSettingsPage() {
        const user = auth.currentUser;
        if (!user || user.isAnonymous) { goBack(); return; }
        document.getElementById('settings-name').value = user.displayName;
        document.getElementById('settings-email').value = user.email;
        database.ref('users/' + user.uid + '/gender').once('value').then(snapshot => {
            const gender = snapshot.val(); 
            if(gender) {
                const radio = document.querySelector(`input[name="gender"][value="${gender}"]`);
                if (radio) radio.checked = true;
            }
        });
        const form = document.getElementById('account-settings-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const newName = document.getElementById('settings-name').value;
            const newGender = document.querySelector('input[name="gender"]:checked')?.value;
            user.updateProfile({ displayName: newName }).then(() => {
                database.ref('users/' + user.uid).update({ 
                    displayName: newName,
                    gender: newGender 
                }).then(() => {
                    showToast("Profile updated successfully!");
                    updateUserProfileUI(user);
                    goBack();
                });
            }).catch(error => { showToast("Error updating profile: " + error.message); });
        };
    }

    function isDirectVideoFile(url) {
        if(!url) return false;
        const lowerUrl = url.toLowerCase();
        return lowerUrl.includes('.mp4') || 
               lowerUrl.includes('.m3u8') || 
               lowerUrl.includes('.mkv') || 
               lowerUrl.includes('.webm') || 
               lowerUrl.includes('/stream/') || 
               lowerUrl.includes('stream');
    }

    function goBack() { 
        const searchPage = document.getElementById('search-page');
        if (searchPage.classList.contains('active')) {
            const searchInput = document.getElementById('global-search-input');
            const term = searchInput.value.trim();
            if (term) {
                saveSearchTerm(term);
            }
        }
        
        // If shorts player is open, go back to shorts grid
        if (document.getElementById('shorts-player-page').style.display === 'flex') {
            exitShortsPlayer();
            return;
        }

        cleanupPlayer();

        if (navigationHistory.length <= 1) { 
            navigateTo('home', true); 
            return; 
        } 

        navigationHistory.pop(); 
        const previousPage = navigationHistory[navigationHistory.length - 1]; 

        if (typeof previousPage === 'object' && (previousPage.type === 'detail' || previousPage.type === 'series_detail')) { 
            const item = allContent.find(c => c.id === previousPage.id); 
            if(item) { 
                if(item.type === 'webseries') showSeriesDetail(item, true); 
                else showDetail(item, true); 
            } 
        } else if (typeof previousPage === 'object' && previousPage.page === 'livetv-category') { 
            renderLiveTvCategoryPage(previousPage.category, true); 
        } else if (typeof previousPage === 'string') { 
            navigateTo(previousPage, true); 
        } else { 
            navigateTo('home', true); 
        } 
    }

    function cleanupPlayer() {
        if (liveTvPlayer) { liveTvPlayer.destroy(); liveTvPlayer = null; }
        if (moviePlayer) { moviePlayer.destroy(); moviePlayer = null; }
        if (seriesPlayer) { seriesPlayer.destroy(); seriesPlayer = null; }
        if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }
        
        document.getElementById('movie-player-element').src = '';
        document.getElementById('series-player-element').src = '';
        document.getElementById('livetv-player-element').src = '';
        
        const frames = document.querySelectorAll('.player-iframe');
        frames.forEach(frame => {
            frame.src = '';
            frame.classList.remove('active');
        });
    }

    function toggleWatchlist(item) { if (!item) return; const index = watchlist.findIndex(w => w.id === item.id); if (index > -1) { watchlist.splice(index, 1); showToast("Removed from My List"); } else { watchlist.push(item); showToast("Added to My List"); } localStorage.setItem('nareshworld_watchlist', JSON.stringify(watchlist)); updateDetailWatchlistButton(item); updatePlayerWatchlistButton(item); updateSeriesDetailWatchlistButton(item); updateSeriesPlayerWatchlistButton(item); if (document.querySelector('#nav-watchlist.active')) renderWatchlistPage(); }
    function removeFromWatchlist(index) { watchlist.splice(index, 1); localStorage.setItem('nareshworld_watchlist', JSON.stringify(watchlist)); renderWatchlistPage(); }
    
    function playContent(item) { 
        if (item.isPremium && !isPremiumUser) {
            showToast("This is a Premium Movie. Please upgrade.");
            setTimeout(() => navigateTo('premium'), 1000);
            return;
        }
        const link = item.link; 
        if (link) { 
            addToWatchHistory(item); 
            handleAdDisplay(item, null); 
        } 
        else { alert('No content available to play.'); } 
    }
    
    function handleAdDisplay(contentItem, episodeItem) {
        if (isPremiumUser || activeAds.length === 0) {
            if (contentItem.type === 'webseries' && episodeItem) {
                showSeriesPlayer(contentItem, episodeItem);
            } else {
                showMoviePlayer(contentItem);
            }
            return;
        }

        const ad = activeAds[Math.floor(Math.random() * activeAds.length)];
        const overlay = document.getElementById('ad-overlay');
        const mediaContainer = document.getElementById('ad-media-container');
        const timerEl = document.getElementById('ad-timer');
        const skipBtn = document.getElementById('ad-skip-btn');
        const visitBtn = document.getElementById('ad-visit-btn');

        mediaContainer.innerHTML = '';
        if (ad.type === 'video') {
            const video = document.createElement('video');
            video.src = ad.mediaUrl;
            video.autoplay = true;
            video.playsInline = true;
            video.controls = false;
            video.muted = false; 
            video.onclick = () => { if(ad.targetUrl) window.open(ad.targetUrl, '_blank'); };
            mediaContainer.appendChild(video);
            video.play().catch(() => { video.muted = true; video.play(); });
        } else {
            const img = document.createElement('img');
            img.src = ad.mediaUrl;
            img.onclick = () => { if(ad.targetUrl) window.open(ad.targetUrl, '_blank'); };
            mediaContainer.appendChild(img);
        }

        if (ad.targetUrl) {
            visitBtn.style.display = 'block';
            visitBtn.onclick = () => window.open(ad.targetUrl, '_blank');
        } else {
            visitBtn.style.display = 'none';
        }

        skipBtn.classList.add('hidden');
        overlay.classList.add('active');

        let timeLeft = ad.duration || 10;
        timerEl.textContent = `Ad: ${timeLeft}s`;

        if (adTimerInterval) clearInterval(adTimerInterval);
        
        adTimerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Ad: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(adTimerInterval);
                finishAd();
            }
        }, 1000);

        function finishAd() {
            overlay.classList.remove('active');
            mediaContainer.innerHTML = '';
            if (contentItem.type === 'webseries' && episodeItem) {
                showSeriesPlayer(contentItem, episodeItem);
            } else {
                showMoviePlayer(contentItem);
            }
        }
    }

    function setupPlayerFullscreenRotation(player) {
        if (!player) return;
        player.on('enterfullscreen', () => { 
            if (screen.orientation && typeof screen.orientation.lock === 'function') { 
                screen.orientation.lock('landscape').catch(err => {
                    console.log('Rotation lock not supported via API, using CSS fallback');
                }); 
            }
        });
        
        player.on('exitfullscreen', () => { 
            if (screen.orientation && typeof screen.orientation.unlock === 'function') { 
                screen.orientation.unlock(); 
            }
        });
    }

    function addPlayerWatermark(player) {
        if (!player || !player.elements || !player.elements.container) return;
        const container = player.elements.container;
        if (container && !container.querySelector('.plyr__watermark')) {
            const watermark = document.createElement('div');
            watermark.className = 'plyr__watermark';
            watermark.innerHTML = `N<span class="hunt-text">ARESH WORLD</span>`;
            container.appendChild(watermark);
        }
    }

    function addScreenFitControl(player) {
        if (!player || !player.elements || !player.elements.controls) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'plyr__control';
        btn.setAttribute('data-plyr', 'fit');
        btn.innerHTML = '<i class="fas fa-expand"></i>';
        
        const fullscreenBtn = player.elements.controls.querySelector('[data-plyr="fullscreen"]');
        if (fullscreenBtn) {
            fullscreenBtn.parentNode.insertBefore(btn, fullscreenBtn);
        } else {
            player.elements.controls.appendChild(btn);
        }

        const fitModes = ['contain', 'cover', 'fill'];
        const fitIcons = ['fa-expand', 'fa-compress-arrows-alt', 'fa-arrows-alt-h'];
        let currentFitIndex = 0;
        const videoElement = player.media;

        videoElement.classList.remove('video-fit-contain', 'video-fit-cover', 'video-fit-fill');
        videoElement.classList.add('video-fit-contain');

        btn.addEventListener('click', () => {
            videoElement.classList.remove(`video-fit-${fitModes[currentFitIndex]}`);
            currentFitIndex = (currentFitIndex + 1) % fitModes.length;
            videoElement.classList.add(`video-fit-${fitModes[currentFitIndex]}`);
            btn.innerHTML = `<i class="fas ${fitIcons[currentFitIndex]}"></i>`;
            showToast(`Screen Mode: ${fitModes[currentFitIndex].toUpperCase()}`);
        });
    }
    
    function loadVideoSource(url, videoElement, playerInstance, errorCallback) {
         if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }
         videoElement.src = "";
         
         if (Hls.isSupported() && url.includes('.m3u8')) {
            hlsInstance = new Hls({ 
                enableWorker: true, 
                lowLatencyMode: true,
                startLevel: -1, 
                capLevelToPlayerSize: true, 
                maxBufferLength: 60,
                backBufferLength: 90 
            });
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(videoElement);
            hlsInstance.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    if(errorCallback) errorCallback();
                }
            });
         } else if (videoElement.canPlayType('application/vnd.apple.mpegurl') && url.includes('.m3u8')) {
            videoElement.src = url;
         } else {
            videoElement.src = url;
         }
    }

    function attemptAutoplay(player) {
        if(!player) return;
        var playPromise = player.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
            }).catch(error => {
                console.log("Autoplay blocked. Muting and trying again.");
                player.muted = true;
                player.play();
                showToast("Unmute for sound");
            });
        }
    }
    
    function itemHasCategory(item, categoryName) {
        if (!item.category) return false;
        const cats = item.category.split(',').map(c => c.trim());
        return cats.includes(categoryName);
    }
    
    function areItemsSimilar(item1, item2) {
        if (!item1.category || !item2.category) return false;
        const cats1 = item1.category.split(',').map(c => c.trim());
        const cats2 = item2.category.split(',').map(c => c.trim());
        return cats1.some(cat => cats2.includes(cat));
    }

    // =============================================
    // WATCH PROGRESS (LOCAL STORAGE) & CONTINUE WATCHING
    // =============================================
    function getWatchProgress() {
        const stored = localStorage.getItem(WATCH_PROGRESS_KEY);
        return stored ? JSON.parse(stored) : {};
    }

    function saveWatchProgress(contentId, progressPercent, updatedAt = Date.now()) {
        const progress = getWatchProgress();
        progress[contentId] = { progress: progressPercent, updatedAt };
        localStorage.setItem(WATCH_PROGRESS_KEY, JSON.stringify(progress));
    }

    function setupProfessionalPlayerFeatures(player, contentId) {
        if(!player || !player.elements || !player.elements.container) return;

        // Load saved progress from localStorage
        const progressData = getWatchProgress();
        const saved = progressData[contentId];
        
        player.on('ready', () => {
            if (saved && saved.progress > 5) {
                const duration = player.duration;
                const targetTime = (saved.progress / 100) * duration;
                if (targetTime < duration - 10) {
                    player.currentTime = targetTime;
                    showToast("Resumed from last watched");
                }
            }
        });
        
        player.on('timeupdate', () => {
            if (player.duration) {
                const percent = (player.currentTime / player.duration) * 100;
                if (Math.floor(player.currentTime) % 5 === 0) {
                    saveWatchProgress(contentId, percent);
                }
            }
        });
        
        player.on('ended', () => {
            const progress = getWatchProgress();
            delete progress[contentId];
            localStorage.setItem(WATCH_PROGRESS_KEY, JSON.stringify(progress));
        });

        const wrapper = player.elements.container;
        const leftZone = wrapper.parentElement.querySelector('.double-tap-overlay.left');
        const rightZone = wrapper.parentElement.querySelector('.double-tap-overlay.right');
        
        if(!leftZone || !rightZone) return;

        let lastTapLeft = 0;
        let lastTapRight = 0;

        const triggerTap = (zone, isForward) => {
            zone.classList.add('active');
            setTimeout(() => zone.classList.remove('active'), 500);
            if(isForward) player.forward(10);
            else player.rewind(10);
        };

        wrapper.addEventListener('touchend', (e) => {
            const touchX = e.changedTouches[0].clientX;
            const width = window.innerWidth;
            const now = Date.now();
            let isDoubleTap = false;
            
            if(touchX < width * 0.40) {
                if (now - lastTapLeft < 300) {
                     isDoubleTap = true;
                     triggerTap(leftZone, false);
                }
                lastTapLeft = now;
            }
            else if (touchX > width * 0.60) {
                if (now - lastTapRight < 300) {
                    isDoubleTap = true;
                    triggerTap(rightZone, true);
                }
                lastTapRight = now;
            }

            if(isDoubleTap) {
                e.preventDefault();
                e.stopPropagation();
            }

        }, { capture: true });

        let startY, startVol, startX;
        const feedback = wrapper.parentElement.querySelector('.video-overlay-feedback');
        const feedbackIcon = feedback.querySelector('i');
        const feedbackText = feedback.querySelector('.feedback-text');

        wrapper.addEventListener('touchstart', (e) => {
             startY = e.touches[0].clientY;
             startX = e.touches[0].clientX;
             startVol = player.volume;
        }, {passive: false});

        wrapper.addEventListener('touchmove', (e) => {
            if(!startY) return;
            const currentY = e.touches[0].clientY;
            const currentX = e.touches[0].clientX;
            const diffY = startY - currentY;
            const width = window.innerWidth;
            
            if (Math.abs(diffY) > 10 && Math.abs(currentX - startX) < 30) {
                e.preventDefault();

                if(startX > width / 2) {
                     let newVol = Math.min(1, Math.max(0, startVol + (diffY / 200)));
                     player.volume = newVol;
                     
                     feedbackIcon.className = newVol > 0.5 ? 'fas fa-volume-up' : (newVol > 0 ? 'fas fa-volume-down' : 'fas fa-volume-mute');
                     feedbackText.textContent = Math.round(newVol * 100) + '%';
                     
                     feedback.classList.remove('show');
                     void feedback.offsetWidth; 
                     feedback.classList.add('show');
                }
                else {
                    let currentBrit = parseFloat(wrapper.getAttribute('data-brightness') || 1);
                    let newBrit = Math.min(1.5, Math.max(0.2, currentBrit + (diffY / 500)));
                    
                    const vid = wrapper.querySelector('video');
                    if(vid) vid.style.filter = `brightness(${newBrit})`;
                    
                    wrapper.setAttribute('data-brightness', newBrit);

                    feedbackIcon.className = 'fas fa-sun';
                    feedbackText.textContent = Math.round((newBrit/1.5) * 100) + '%';
                    
                    feedback.classList.remove('show');
                    void feedback.offsetWidth;
                    feedback.classList.add('show');
                }
            }
        }, {passive: false});
    }

    // =============================================
    // CONTINUE WATCHING SECTION RENDER
    // =============================================
    function renderContinueWatchingSection() {
        const user = auth.currentUser;
        const container = document.getElementById('category-container');
        const existing = document.getElementById('continue-watching-section');
        if (existing) existing.remove();

        const progress = getWatchProgress();
        const entries = Object.entries(progress);
        if (entries.length === 0) return;

        // Filter to content that exists
        const validEntries = entries.filter(([id]) => allContent.some(c => c.id === id));
        if (validEntries.length === 0) return;

        validEntries.sort((a, b) => b[1].updatedAt - a[1].updatedAt);

        const section = document.createElement('div');
        section.className = 'category-section';
        section.id = 'continue-watching-section';
        section.innerHTML = `
            <div class="category-header">
                <h2 class="category-title">Continue Watching</h2>
            </div>
            <div class="content-slider" id="continue-watching-slider"></div>
        `;

        // Insert after slider container
        const sliderContainer = document.getElementById('slider-container');
        if (sliderContainer) {
            sliderContainer.parentNode.insertBefore(section, sliderContainer.nextSibling);
        } else {
            container.insertBefore(section, container.firstChild);
        }

        const slider = section.querySelector('#continue-watching-slider');
        
        validEntries.slice(0, 10).forEach(([id, data]) => {
            const item = allContent.find(c => c.id === id);
            if (!item) return;
            
            const card = document.createElement('div');
            card.className = 'content-card';
            card.style.position = 'relative';
            
            let badgeHtml = createBadge(item);
            let lockHtml = '';
            if (item.isPremium && !isPremiumUser) {
                lockHtml = `<div class="premium-lock-overlay"><i class="fas fa-lock premium-lock-icon"></i></div>`;
            }

            card.innerHTML = `
                <img src="${item.poster}" alt="${item.title}">
                ${lockHtml}
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width:${data.progress}%"></div>
                </div>
                <div class="content-card-overlay">
                    <span class="content-card-title">${item.title}</span>
                </div>
                ${badgeHtml}
            `;
            
            card.onclick = () => {
                if (item.type === 'webseries') {
                    showSeriesDetail(item);
                } else {
                    showDetail(item);
                }
            };
            
            slider.appendChild(card);
        });
    }

    function switchMovieInPlayer(item) {
        if (item.isPremium && !isPremiumUser) {
            showToast("Premium Content. Please upgrade.");
            setTimeout(() => navigateTo('premium'), 1000);
            return;
        }

        currentContent = item;
        addToWatchHistory(item);
        const page = document.getElementById('movie-player-page');
        const errorOverlay = page.querySelector('.player-error-overlay');
        const loadingOverlay = page.querySelector('.player-loading-overlay');
        const videoElement = document.getElementById('movie-player-element');
        const iframeElement = document.getElementById('movie-player-iframe');
        
        errorOverlay.classList.remove('show');

        if (moviePlayer) { moviePlayer.destroy(); moviePlayer = null; }
        if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }

        if (isDirectVideoFile(item.link)) {
            iframeElement.classList.remove('active');
            iframeElement.src = "";
            videoElement.style.display = 'block';
            loadingOverlay.classList.add('show');

            const oldVideo = videoElement;
            const newVideo = oldVideo.cloneNode(true);
            newVideo.style.filter = "brightness(1)";
            oldVideo.parentNode.replaceChild(newVideo, oldVideo);
            const cleanVideoElement = newVideo;
            
            loadVideoSource(item.link, cleanVideoElement, null, () => {
                 errorOverlay.classList.add('show'); loadingOverlay.classList.remove('show');
            });
            cleanVideoElement.onerror = () => { errorOverlay.classList.add('show'); loadingOverlay.classList.remove('show'); };
            
            const autoPlayConfig = { ...playerConfig, autoplay: true, muted: false };
            moviePlayer = new Plyr(cleanVideoElement, autoPlayConfig);
            addPlayerWatermark(moviePlayer);
            addScreenFitControl(moviePlayer); 
            setupProfessionalPlayerFeatures(moviePlayer, item.id);
            moviePlayer.on('playing', () => loadingOverlay.classList.remove('show'));
            moviePlayer.on('ended', () => { 
                if(document.getElementById('movie-autoplay-switch').checked) {
                    const nextItem = moviePlayerSimilarContent[0];
                    if (nextItem) switchMovieInPlayer(nextItem);
                }
            }); 
            moviePlayer.on('ready', () => attemptAutoplay(moviePlayer));
            setupPlayerFullscreenRotation(moviePlayer); 

        } else {
            videoElement.style.display = 'none';
            loadingOverlay.classList.remove('show');
            iframeElement.src = item.link;
            iframeElement.classList.add('active');
        }
        
        document.getElementById('movie-player-title').textContent = item.title;
        document.getElementById('player-watchlist-btn').onclick = () => toggleWatchlist(item);
        document.getElementById('player-share-btn').onclick = () => shareContent(item);
        
        document.getElementById('player-like-btn').onclick = () => handleContentInteraction('like', item);
        document.getElementById('player-dislike-btn').onclick = () => handleContentInteraction('dislike', item);
        loadInteractionStatus(item, 'player');

        updatePlayerWatchlistButton(item);
        
        const similarSlider = document.getElementById('movie-player-similar-slider');
        similarSlider.innerHTML = '';
        moviePlayerSimilarContent = allContent.filter(c => c.id !== item.id && c.type === 'movie' && areItemsSimilar(c, item)).slice(0, 10);
        if(moviePlayerSimilarContent.length > 0) {
             moviePlayerSimilarContent.forEach(content => {
                const card = createContentCard(content);
                card.onclick = () => switchMovieInPlayer(content); 
                similarSlider.appendChild(card);
            });
        }
    }

    function showMoviePlayer(item) { ['home-page', 'detail-page', 'search-page', 'series-detail-page'].forEach(id => document.getElementById(id).style.display = 'none'); document.getElementById('bottom-nav').style.display = 'none'; document.getElementById('movie-player-page').style.display = 'flex'; switchMovieInPlayer(item); }
    
    function showSeriesPlayer(seriesItem, episode) {
        ['home-page', 'detail-page', 'search-page', 'series-detail-page'].forEach(id => document.getElementById(id).style.display = 'none');
        document.getElementById('bottom-nav').style.display = 'none';
        document.getElementById('series-player-page').style.display = 'flex';
        switchSeriesEpisodeInPlayer(seriesItem, episode);
    }

    function exitPlayerAndGoBack() {
        cleanupPlayer();
        goBack();
    }
    
    function showTrailer(url) { const trailerModal = document.getElementById('trailer-modal'); const trailerIframe = document.getElementById('trailer-iframe'); const trailerId = getYouTubeEmbedId(url); if (trailerId) { trailerIframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0`; trailerModal.classList.add('active'); } else { alert('No trailer available for this title.'); } }
    function closeTrailer() { const trailerModal = document.getElementById('trailer-modal'); const trailerIframe = document.getElementById('trailer-iframe'); trailerIframe.src = ''; trailerModal.classList.remove('active'); }
    
    function renderHomePage() { 
        const container = document.getElementById('category-container'); 
        container.innerHTML = `<div class="slider-container" id="slider-container"></div>`; 
        container.className = ''; 
        const movies = allContent.filter(c => c.type === 'movie'); 
        const series = allContent.filter(c => c.type === 'webseries');
        
        updateSlider(movies); 
        
        // Add Continue Watching section
        renderContinueWatchingSection();
        
        renderTrendingSection(movies); 
        
        if (series.length > 0) {
            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `<div class="category-header"><h2 class="category-title">Popular Series</h2><a href="#" class="see-all-btn" onclick="event.preventDefault(); navigateTo('series')">See All &gt;</a></div><div class="content-slider"></div>`;
            const slider = section.querySelector('.content-slider');
            series.slice(0, 10).forEach(item => slider.appendChild(createBackdropCard(item)));
            container.appendChild(section);
        }

        updateCategories(movies, 'movie'); 
    }

    function renderTrendingSection(content) {
        const container = document.getElementById('category-container');
        
        let bestOfEachCategory = [];
        allCategories.forEach(categoryName => {
            const moviesInCategory = content.filter(movie => itemHasCategory(movie, categoryName));
            
            if (moviesInCategory.length > 0) {
                moviesInCategory.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                bestOfEachCategory.push(moviesInCategory[0]);
            }
        });

        bestOfEachCategory = [...new Set(bestOfEachCategory)];

        const trendingContent = bestOfEachCategory.slice(0, 10);
        
        if (trendingContent.length === 0) return;
        
        const section = document.createElement('div');
        section.className = 'category-section';
        section.innerHTML = `<div class="category-header"><h2 class="category-title">Top Trending</h2></div><div class="content-slider"></div>`;
        const slider = section.querySelector('.content-slider');
        trendingContent.forEach((item, index) => {
            slider.appendChild(createTrendingCard(item, index + 1));
        });
        container.appendChild(section);
    }
    
    function createBadge(item) {
        if (item.isPremium) {
            return `<div class="new-badge-ribbon" style="z-index:10;"><span style="background:var(--premium-gold); color:black;">VIP</span></div>`;
        }
        if (item.isNew) {
            return `<div class="new-badge-ribbon"><span>New</span></div>`;
        }
        if (item.qualityBadge && item.qualityBadge !== 'none') {
             return `<div class="new-badge-ribbon"><span>${item.qualityBadge}</span></div>`;
        }
        return '';
    }

    function createTrendingCard(item, rank) { const card = document.createElement('div'); card.className = 'trending-card'; card.tabIndex = 0; card.onclick = () => item.type === 'webseries' ? showSeriesDetail(item) : showDetail(item); const badgeHtml = createBadge(item); card.innerHTML = `<img src="${item.poster}" alt="${item.title}">${badgeHtml}<span class="trending-rank">${rank}</span><span class="trending-title">${item.title}</span>`; return card; }
    
    function updateCategories(content, contentType = 'movie') {
        const container = document.getElementById('category-container');
        allCategories.forEach(categoryName => {
            const categoryContent = content
                .filter(item => itemHasCategory(item, categoryName) && item.type === contentType)
                .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

            if (categoryContent.length === 0) return;
            
            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `<div class="category-header"><h2 class="category-title">${categoryName}</h2><a href="#" class="see-all-btn" onclick="event.preventDefault(); renderCategoryPage('${categoryName}', '${contentType}')">See All &gt;</a></div><div class="content-slider"></div>`;
            
            const slider = section.querySelector('.content-slider');
            categoryContent.slice(0, 10).forEach(item => slider.appendChild(createContentCard(item)));
            container.appendChild(section);
        });
    }

    function createContentCard(item) { 
        const card = document.createElement('div'); card.className = 'content-card'; card.tabIndex = 0; 
        card.onclick = () => item.type === 'webseries' ? showSeriesDetail(item) : showDetail(item); 
        let badgeHtml = createBadge(item); 
        
        let lockHtml = '';
        if (item.isPremium && !isPremiumUser) {
            lockHtml = `<div class="premium-lock-overlay"><i class="fas fa-lock premium-lock-icon"></i></div>`;
        }

        card.innerHTML = `<img src="${item.poster}" alt="${item.title}">${lockHtml}<div class="content-card-overlay"><span class="content-card-title">${item.title}</span></div>${badgeHtml}`; 
        return card; 
    }
    
    function createBackdropCard(item) {
        const card = document.createElement('div');
        card.className = 'backdrop-card';
        card.tabIndex = 0;
        card.onclick = () => showSeriesDetail(item);
        let badgeHtml = createBadge(item);
        
        let lockHtml = '';
        if (item.isPremium && !isPremiumUser) {
            lockHtml = `<div class="premium-lock-overlay"><i class="fas fa-lock premium-lock-icon"></i></div>`;
        }

        card.innerHTML = `<img src="${item.backdrop || item.poster}" alt="${item.title}">${lockHtml}<div class="content-card-overlay"><span class="content-card-title">${item.title}</span></div>${badgeHtml}`;
        return card;
    }
    
    function updateSlider(content) { const sliderContainer = document.getElementById('slider-container'); sliderContainer.innerHTML = `<div class="slider" id="slider"></div><div class="slider-indicators" id="slider-indicators"></div>`; const slider = document.getElementById('slider'), indicators = document.getElementById('slider-indicators'); const recentItems = content.slice(0, 5); if (recentItems.length === 0) { sliderContainer.style.display = 'none'; return; } sliderContainer.style.display = 'block'; slider.innerHTML = ''; indicators.innerHTML = ''; recentItems.forEach((item, index) => { const slide = document.createElement('div'); slide.className = 'slide'; slide.innerHTML = `<img src="${item.backdrop || item.poster}" alt="${item.title}"><div class="slide-overlay"><div class="slide-title">${item.title}</div><div class="slide-meta">★ ${item.rating || 'N/A'} ・ ${item.year || 'Unknown'}</div></div>`; slide.onclick = () => item.type === 'webseries' ? showSeriesDetail(item) : showDetail(item); slider.appendChild(slide); const indicator = document.createElement('div'); indicator.className = `indicator ${index === 0 ? 'active' : ''}`; indicator.onclick = () => goToSlide(index); indicators.appendChild(indicator); }); startSlider(recentItems.length); goToSlide(0); }
    
    function showDetail(item, isFromHistory = false) { 
        if (!isFromHistory) { navigationHistory.push({ type: 'detail', id: item.id }); } 
        currentContent = item; 
        if (sliderInterval) clearInterval(sliderInterval); 
        document.getElementById('detail-backdrop').innerHTML = `<img src="${item.backdrop || item.poster}" alt="">`; 
        document.getElementById('detail-title').textContent = item.title; 
        document.getElementById('detail-meta').innerHTML = `★ ${item.rating || 'N/A'} ・ ${item.year || 'Unknown Year'}`; 
        
        const playBtn = document.getElementById('play-btn');
        if (item.isPremium && !isPremiumUser) {
            playBtn.innerHTML = `<i class="fas fa-lock"></i> <span>UNLOCK PREMIUM</span>`;
            playBtn.style.backgroundColor = 'var(--premium-gold)';
            playBtn.style.color = 'black';
            playBtn.onclick = () => navigateTo('premium');
        } else {
            playBtn.innerHTML = `<i class="fas fa-play"></i> <span>PLAY</span>`;
            playBtn.style.backgroundColor = 'var(--primary-color)';
            playBtn.style.color = 'white';
            playBtn.onclick = () => playContent(item); 
        }

        document.getElementById('detail-storyline').textContent = item.storyline || 'No storyline available.'; 
        document.getElementById('detail-trailer-btn').onclick = () => { if (item.trailer && item.trailer.trim()) { showTrailer(item.trailer); } else { alert('No trailer available for this title.'); } }; 
        document.getElementById('detail-watchlist-btn').onclick = () => toggleWatchlist(item);
        document.getElementById('detail-share-btn').onclick = () => shareContent(item);

        const castList = document.getElementById('detail-cast-list'); 
        castList.innerHTML = ''; 
        if (item.cast?.length > 0) { 
            document.getElementById('detail-cast-section').style.display = 'block'; 
            item.cast.forEach(actor => { 
                const castItem = document.createElement('div'); 
                castItem.className = 'cast-item'; 
                castItem.innerHTML = `<img src="${actor.photo || 'https://via.placeholder.com/70x70?text=No+Photo'}" alt="${actor.name}"><p>${actor.name}</p>`; 
                castList.appendChild(castItem); 
            }); 
        } else { document.getElementById('detail-cast-section').style.display = 'none'; } 
        
        const similarSlider = document.getElementById('similar-slider'); 
        similarSlider.innerHTML = ''; 
        const similarContent = allContent.filter(c => c.id !== item.id && c.type === 'movie' && areItemsSimilar(c, item)).slice(0, 10); 
        if (similarContent.length > 0) { 
            document.getElementById('similar-section').style.display = 'block'; 
            similarContent.forEach(content => similarSlider.appendChild(createContentCard(content))); 
        } else { 
            document.getElementById('similar-section').style.display = 'none'; 
        } 
        
        updateDetailWatchlistButton(item); 
        ['home-page', 'search-page', 'notification-page', 'series-detail-page'].forEach(id => document.getElementById(id).style.display = 'none'); 
        document.getElementById('detail-page').style.display = 'block'; 
        document.getElementById('back-btn').style.display = 'block'; 
        document.getElementById('bottom-nav').style.display = 'none'; 
        window.scrollTo(0, 0); 
    }
    
    function renderCategoryPage(categoryName, contentType, isFromHistory = false) { 
        if (!isFromHistory) { navigationHistory.push({ type: 'category', name: categoryName }); } 
        document.getElementById('home-page').style.display = 'block'; 
        document.getElementById('home-header').style.display = 'none'; 
        document.getElementById('detail-page').style.display = 'none'; 
        const container = document.getElementById('category-container'); 
        container.innerHTML = ''; 
        container.className = 'content-grid'; 
        const pageHeader = document.getElementById('page-header'); 
        pageHeader.classList.remove('hidden'); 
        pageHeader.classList.add('centered-header'); 
        pageHeader.querySelector('i').style.display = 'none'; 
        document.getElementById('page-title').textContent = categoryName; 
        document.getElementById('back-btn').style.display = 'block'; 
        document.getElementById('bottom-nav').style.display = 'none'; 
        const categoryContent = allContent.filter(item => itemHasCategory(item, categoryName) && item.type === contentType); 
        if (categoryContent.length > 0) { categoryContent.forEach(item => container.appendChild(createContentCard(item))); } 
        else { container.innerHTML = `<div class="empty-state"><p>No items found in ${categoryName}</p></div>`; } 
        window.scrollTo(0, 0); 
    }
    function renderWatchlistPage() { const container = document.getElementById('category-container'); container.innerHTML = ''; if (watchlist.length === 0) { container.className = 'is-empty-page'; container.innerHTML = `<div class="empty-state" style="min-height: calc(100vh - 200px); display: flex; flex-direction: column; justify-content: center;"><i class="fas fa-bookmark empty-icon"></i><p>Your Watchlist is Empty</p><span>Add movies and series to see them here.</span></div>`; } else { container.className = 'watchlist-container-pro'; [...watchlist].reverse().forEach((item, index) => { const reversedIndex = watchlist.length - 1 - index; container.appendChild(createProfessionalWatchlistCard(item, reversedIndex)); }); } }
    function createProfessionalWatchlistCard(item, index) { const card = document.createElement('div'); card.className = 'watchlist-card-pro'; card.tabIndex = 0; card.onclick = () => item.type === 'webseries' ? showSeriesDetail(item) : showDetail(item); card.innerHTML = `<button class="remove-btn-pro" onclick="event.stopPropagation(); removeFromWatchlist(${index})"><i class="fas fa-times"></i></button><div class="poster"><img src="${item.poster}" alt="${item.title}"></div><div class="info"><h3 class="title">${item.title}</h3><p class="meta">${item.year || 'N/A'} &bull; ${item.genre || 'Movie'} &bull; ★ ${item.rating || 'N/A'}</p><i class="fas fa-play-circle play-icon"></i></div>`; return card; }
    
    // --- SEARCH FUNCTIONS ---
    function performSearch() {
        const input = document.getElementById('global-search-input');
        const clearBtn = document.getElementById('search-clear-btn');
        const term = input.value.trim();
        const resultsContainer = document.getElementById('search-results-container');
        const initialStateContainer = document.getElementById('search-initial-state');

        clearBtn.classList.toggle('hidden', term.length === 0);

        if (term.length === 0) {
            renderInitialSearchState();
            return;
        }

        initialStateContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');

        const lowerCaseTerm = term.toLowerCase();
        const results = allContent.filter(item => 
            item.title.toLowerCase().includes(lowerCaseTerm) || 
            (item.category?.toLowerCase().includes(lowerCaseTerm)) || 
            (item.genre?.toLowerCase().includes(lowerCaseTerm))
        );
        
        if (results.length === 0) {
            const escapedTerm = term.replace(/'/g, "\\'");
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open empty-icon"></i>
                    <p>No Results Found For "${term}"</p>
                    <span>Can't find what you're looking for?</span>
                    <button class="auth-btn request-movie-btn" onclick="handleMovieRequestFromSearch('${escapedTerm}')">
                        <i class="fas fa-paper-plane"></i> Send Movie Request
                    </button>
                </div>`;
        } else {
            resultsContainer.innerHTML = '';
            results.forEach(item => resultsContainer.appendChild(createSearchResultCard(item)));
        }
    }

    function renderInitialSearchState() {
        document.getElementById('search-initial-state').classList.remove('hidden');
        document.getElementById('search-results-container').classList.add('hidden');
        document.getElementById('search-results-container').innerHTML = '';
        const recentContainer = document.getElementById('recent-searches-container');
        const popularContainer = document.getElementById('popular-categories-container');
        const recentList = document.getElementById('recent-searches-list');
        recentList.innerHTML = '';

        if (recentSearches.length > 0) {
            recentContainer.style.display = 'block';
            popularContainer.style.display = 'none';
            recentSearches.forEach(term => {
                const item = document.createElement('div');
                item.className = 'recent-search-item';
                item.innerHTML = `<i class="fas fa-history icon"></i><span class="text">${term}</span><button class="remove-btn" onclick="event.stopPropagation(); removeSearchTerm('${term}')"><i class="fas fa-times"></i></button>`;
                item.onclick = () => searchByTag(term);
                recentList.appendChild(item);
            });
        } else {
            recentContainer.style.display = 'none';
            popularContainer.style.display = 'block';
        }

        const categoriesList = document.getElementById('popular-categories-list');
        if (categoriesList.children.length === 0) {
            categoriesList.innerHTML = '';
            const popularCategories = [...allCategories].slice(0, 8);
            popularCategories.forEach(category => {
                const tag = document.createElement('div');
                tag.className = 'suggestion-tag';
                tag.textContent = category;
                tag.onclick = () => searchByTag(category);
                categoriesList.appendChild(tag);
            });
        }
    }

    function handleMovieRequestFromSearch(movieName) {
        navigateTo('movieRequest');
        setTimeout(() => {
            const movieNameInput = document.getElementById('request-movie-name');
            if (movieNameInput) {
                movieNameInput.value = movieName;
            }
        }, 100);
    }
    
    function createSearchResultCard(item) { const card = document.createElement('div'); card.className = 'search-result-card'; card.tabIndex = 0; card.onclick = () => item.type === 'webseries' ? showSeriesDetail(item) : showDetail(item); card.innerHTML = `<div class="search-result-poster"><img src="${item.poster}" alt="${item.title}"></div><div class="search-result-info"><h3 class="search-result-title">${item.title}</h3><p class="search-result-meta">${item.year || ''} &bull; ${item.genre || item.type}</p><p class="search-result-storyline">${item.storyline || 'No description available.'}</p></div>`; return card; }

    function clearSearchInput() { 
        const input = document.getElementById('global-search-input');
        const termToSave = input.value.trim();
        if (termToSave) {
            saveSearchTerm(termToSave);
        }
        input.value = ''; 
        performSearch(); 
        input.focus(); 
    }
    
    function searchByTag(term) { document.getElementById('global-search-input').value = term; performSearch(); }
    function saveSearchTerm(term) { if (!term || term.length < 1) return; recentSearches = recentSearches.filter(t => t.toLowerCase() !== term.toLowerCase()); recentSearches.unshift(term); if (recentSearches.length > 6) recentSearches.pop(); localStorage.setItem('nareshworld_recent_searches', JSON.stringify(recentSearches)); }
    function removeSearchTerm(term) { recentSearches = recentSearches.filter(t => t !== term); localStorage.setItem('nareshworld_recent_searches', JSON.stringify(recentSearches)); renderInitialSearchState(); }
    function clearAllRecentSearches() { recentSearches = []; localStorage.removeItem('nareshworld_recent_searches'); renderInitialSearchState(); }
    // --- END OF SEARCH FUNCTIONS ---

    function goToSlide(index){ currentSlide = index; document.getElementById('slider').style.transform = `translateX(-${100 * currentSlide}%)`; document.querySelectorAll('#slider-indicators .indicator').forEach((ind, i) => ind.classList.toggle('active', i === currentSlide)); }
    function startSlider(count){ if(sliderInterval) clearInterval(sliderInterval); if(count > 0) sliderInterval=setInterval(() => { currentSlide=(currentSlide+1)%count; goToSlide(currentSlide)}, 5000); }
    function getYouTubeEmbedId(url) { let id = ''; const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/); if (match && match[1]) id = match[1]; return id; }
    function updateDetailWatchlistButton(item) { const btn = document.getElementById('detail-watchlist-btn'); if (!btn || !item) return; const icon = btn.querySelector('i'); const isIn = watchlist.some(w => w.id === item.id); if (isIn) { btn.classList.add('active'); icon.className = 'fas fa-check'; } else { btn.classList.remove('active'); icon.className = 'fas fa-plus'; } }
    function updatePlayerWatchlistButton(item) { const btn = document.getElementById('player-watchlist-btn'); if (!btn || !item) return; const icon = btn.querySelector('i'); const isIn = watchlist.some(w => w.id === item.id); if (isIn) { btn.classList.add('active'); icon.className = 'fas fa-check'; } else { btn.classList.remove('active'); icon.className = 'fas fa-plus'; } }
    
    async function loadInteractionStatus(item, playerPrefix) {
        const user = auth.currentUser;
        const likeBtn = document.getElementById(`${playerPrefix}-like-btn`);
        const dislikeBtn = document.getElementById(`${playerPrefix}-dislike-btn`);
        const likeCountEl = document.getElementById(`${playerPrefix}-like-count`);
        const dislikeCountEl = document.getElementById(`${playerPrefix}-dislike-count`);

        if (!likeBtn || !dislikeBtn) return;

        likeBtn.classList.remove('active');
        likeBtn.querySelector('i').className = 'far fa-thumbs-up';
        dislikeBtn.classList.remove('active');
        dislikeBtn.querySelector('i').className = 'far fa-thumbs-down';
        likeCountEl.textContent = '...';
        dislikeCountEl.textContent = '...';

        if (!item) return;

        const contentRef = database.ref(`${item.type}s/${item.id}`);
        contentRef.on('value', snapshot => {
            const data = snapshot.val();
            likeCountEl.textContent = data?.likes || 0;
            dislikeCountEl.textContent = data?.dislikes || 0;
        });

        if (user) {
            const userInteractionRef = database.ref(`user_interactions/${user.uid}/${item.id}`);
            userInteractionRef.on('value', snapshot => {
                const interaction = snapshot.val();
                likeBtn.classList.remove('active');
                likeBtn.querySelector('i').className = 'far fa-thumbs-up';
                dislikeBtn.classList.remove('active');
                dislikeBtn.querySelector('i').className = 'fas fa-thumbs-up';

                if (interaction === 'like') {
                    likeBtn.classList.add('active');
                    likeBtn.querySelector('i').className = 'fas fa-thumbs-up';
                } else if (interaction === 'dislike') {
                    dislikeBtn.classList.add('active');
                    dislikeBtn.querySelector('i').className = 'fas fa-thumbs-down';
                }
            });
        }
    }

    async function handleContentInteraction(action, item) {
        if (!item || !auth.currentUser) {
            showToast("You must be logged in to vote.");
            return;
        }
        const user = auth.currentUser;
        const contentId = item.id;
        const contentType = item.type;
        const contentRef = database.ref(`${contentType}s/${contentId}`);
        const userInteractionRef = database.ref(`user_interactions/${user.uid}/${contentId}`);

        try {
            const snapshot = await userInteractionRef.once('value');
            const currentInteraction = snapshot.val();
            let updates = {};

            if (currentInteraction === action) {
                updates[`${action}s`] = firebase.database.ServerValue.increment(-1);
                await userInteractionRef.remove();
            } else {
                if (currentInteraction) {
                    updates[`${currentInteraction}s`] = firebase.database.ServerValue.increment(-1);
                }
                updates[`${action}s`] = firebase.database.ServerValue.increment(1);
                await userInteractionRef.set(action);
            }
            await contentRef.update(updates);
        } catch (err) {
            console.error("Error updating likes/dislikes:", err);
            showToast("Could not save your vote. Please try again.");
        }
    }
    function addToWatchHistory(item) { const user = auth.currentUser; if (!user || !item) return; const historyRef = database.ref(`watch_history/${user.uid}/${item.id}`); historyRef.set({ id: item.id, timestamp: firebase.database.ServerValue.TIMESTAMP }); }
    function renderHistoryPage() { 
        const user = auth.currentUser; 
        if (!user) return; 
        const container = document.getElementById('history-container'); 
        container.innerHTML = ' '; 
        const historyRef = database.ref(`watch_history/${user.uid}`).orderByChild('timestamp'); 
        historyRef.once('value', snapshot => { 
            if (!snapshot.exists()) { 
                container.innerHTML = `<div class="empty-state" style="min-height: calc(100vh - 200px); display: flex; flex-direction: column; justify-content: center;"><i class="fas fa-history empty-icon"></i><p>No Watch History</p><span>Content you watch will appear here.</span></div>`; 
                return; 
            } 
            const historyItems = []; 
            snapshot.forEach(childSnapshot => { historyItems.push(childSnapshot.val()); }); 
            historyItems.reverse(); 
            historyItems.forEach(historyItem => { 
                const fullContentItem = allContent.find(content => content.id === historyItem.id); 
                if (fullContentItem) { 
                    const card = createProfessionalWatchlistCard(fullContentItem, -1);
                    const removeBtn = card.querySelector('.remove-btn-pro'); 
                    if(removeBtn) { card.removeChild(removeBtn); } 
                    
                    card.onclick = () => {
                        if (fullContentItem.type === 'webseries') {
                            showSeriesDetail(fullContentItem);
                        } else {
                            showDetail(fullContentItem);
                        }
                    };
                    container.appendChild(card); 
                } 
            }); 
        }); 
    }

    function renderSeriesPage() {
        const container = document.getElementById('category-container');
        container.innerHTML = '';
        container.className = '';
        const series = allContent.filter(c => c.type === 'webseries');

        if (series.length === 0) {
            container.innerHTML = `<div class="empty-state" style="padding-top: 50px;"><i class="fas fa-film empty-icon"></i><p>No Series Available</p><span>Check back later for new series.</span></div>`;
            return;
        }

        const featuredSeries = series[0]; 
        const featuredCard = document.createElement('div');
        featuredCard.className = 'featured-series-card';
        featuredCard.tabIndex = 0;
        featuredCard.onclick = () => showSeriesDetail(featuredSeries);
        featuredCard.innerHTML = `
            <img src="${featuredSeries.backdrop || featuredSeries.poster}" class="backdrop" alt="">
            <div class="overlay">
                <h2 class="title">${featuredSeries.title}</h2>
                <p class="meta">★ ${featuredSeries.rating || 'N/A'} ・ ${featuredSeries.year || 'Unknown'}</p>
            </div>`;
        container.appendChild(featuredCard);

        const topRatedSeries = [...series].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);
        if(topRatedSeries.length > 0) {
            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `<div class="category-header"><h2 class="category-title">Top Rated Series</h2></div><div class="content-slider"></div>`;
            const slider = section.querySelector('.content-slider');
            topRatedSeries.forEach(item => slider.appendChild(createBackdropCard(item)));
            container.appendChild(section);
        }
        
        allCategories.forEach(categoryName => {
            const categoryContent = series.filter(item => itemHasCategory(item, categoryName));
            if (categoryContent.length === 0) return;
            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `<div class="category-header"><h2 class="category-title">${categoryName}</h2><a href="#" class="see-all-btn" onclick="event.preventDefault(); renderCategoryPage('${categoryName}', 'webseries')">See All &gt;</a></div><div class="content-slider"></div>`;
            const slider = section.querySelector('.content-slider');
            categoryContent.slice(0, 10).forEach(item => slider.appendChild(createBackdropCard(item)));
            container.appendChild(section);
        });
    }
    
    function showSeriesDetail(item, isFromHistory = false) {
        if (!isFromHistory) { navigationHistory.push({ type: 'series_detail', id: item.id }); }
        currentContent = item;
        if (sliderInterval) clearInterval(sliderInterval);

        document.getElementById('series-header-backdrop').src = item.backdrop || item.poster;
        document.getElementById('series-detail-title').textContent = item.title;
        document.getElementById('series-detail-meta').innerHTML = `★ ${item.rating || 'N/A'} ・ ${item.year || 'Unknown Year'}`;
        document.getElementById('series-detail-storyline').textContent = item.storyline || 'No storyline available.';
        document.getElementById('series-detail-share-btn').onclick = () => shareContent(item);
        document.getElementById('series-detail-watchlist-btn').onclick = () => toggleWatchlist(item);
        
        renderSeasonsAndEpisodesForDetail(item);
        
        updateSeriesDetailWatchlistButton(item);

        const castList = document.getElementById('series-detail-cast-list');
        const castSection = document.getElementById('series-cast-section');
        castList.innerHTML = '';
        if (item.cast?.length > 0) {
            castSection.style.display = 'block';
            item.cast.forEach(actor => { 
                const castItem = document.createElement('div'); 
                castItem.className = 'cast-item'; 
                castItem.innerHTML = `<img src="${actor.photo || 'https://via.placeholder.com/70x70?text=No+Photo'}" alt="${actor.name}"><p>${actor.name}</p>`; 
                castList.appendChild(castItem); 
            }); 
        } else {
            castSection.style.display = 'none';
        }
        
        const similarSlider = document.getElementById('series-similar-slider'); 
        similarSlider.innerHTML = '';
        const similarSection = document.getElementById('series-similar-section');
        const similarContent = allContent.filter(c => c.id !== item.id && c.type === 'webseries' && areItemsSimilar(c, item)).slice(0, 10);
        if (similarContent.length > 0) { 
            similarSection.style.display = 'block'; 
            similarContent.forEach(content => similarSlider.appendChild(createBackdropCard(content)));
        } else { 
            similarSection.style.display = 'none'; 
        }

        ['home-page', 'search-page', 'notification-page', 'detail-page'].forEach(id => document.getElementById(id).style.display = 'none');
        document.getElementById('series-detail-page').style.display = 'block';
        document.getElementById('back-btn').style.display = 'block';
        document.getElementById('bottom-nav').style.display = 'none';
        window.scrollTo(0, 0);
    }
    
    function renderSeasonsAndEpisodesForDetail(seriesItem) {
        const episodesSection = document.getElementById('series-episodes-section');
        episodesSection.innerHTML = ''; 
    
        let episodesArray = seriesItem.episodes;
        if (episodesArray && !Array.isArray(episodesArray)) {
            episodesArray = Object.values(episodesArray);
        }
    
        if (!episodesArray || episodesArray.length === 0) {
            episodesSection.style.display = 'none';
            return;
        }
        episodesSection.style.display = 'block';
    
        const seasons = episodesArray.reduce((acc, ep) => {
            let sVal = ep.season;
            if (sVal === undefined || sVal === null || sVal === "") {
                sVal = 1;
            }
            (acc[sVal] = acc[sVal] || []).push({ ...ep, season: sVal }); 
            return acc;
        }, {});
        
        const seasonNumbers = Object.keys(seasons).sort((a, b) => parseInt(a) - parseInt(b));
    
        episodesSection.innerHTML = `
            <div class="category-header">
                <h2 class="category-title">Episodes</h2>
            </div>
            <div class="season-selector"></div>
            <div id="episode-slider-container" class="content-slider"></div>
        `;
    
        const seasonSelector = episodesSection.querySelector('.season-selector');
        const episodeSliderContainer = episodesSection.querySelector('#episode-slider-container');
    
        seasonNumbers.forEach((seasonNum, index) => {
            const btn = document.createElement('button');
            btn.className = 'season-btn';
            btn.textContent = `Season ${seasonNum}`;
            btn.dataset.season = seasonNum;
            if (index === 0) btn.classList.add('active');
    
            btn.addEventListener('click', (e) => {
                seasonSelector.querySelector('.active')?.classList.remove('active');
                e.target.classList.add('active');
                renderEpisodeSlider(episodeSliderContainer, seriesItem, seasons[seasonNum]);
            });
            seasonSelector.appendChild(btn);
        });
    
        if(seasonNumbers.length > 0) {
            renderEpisodeSlider(episodeSliderContainer, seriesItem, seasons[seasonNumbers[0]]);
        }
    }
    
    function renderEpisodeSlider(container, seriesItem, episodeList) {
        container.innerHTML = '';
        episodeList.sort((a, b) => a.episode - b.episode).forEach(ep => {
            const isLocked = (seriesItem.isPremium || ep.isPremium) && !isPremiumUser;
            
            const card = document.createElement('div');
            card.className = 'episode-slider-card';
            card.tabIndex = 0;
            card.innerHTML = `
                <div class="thumb">
                    <img src="${ep.thumbnail || seriesItem.poster}" alt="${ep.title}">
                    ${isLocked ? '<i class="fas fa-lock" style="position:absolute; top:10px; right:10px; color:gold;"></i>' : '<i class="fas fa-play-circle play-icon"></i>'}
                </div>
                <div class="info">
                    <p class="title">E${ep.episode}: ${ep.title || 'Episode ' + ep.episode}</p>
                </div>
            `;
            card.onclick = () => playSeriesEpisode(seriesItem, ep);
            container.appendChild(card);
        });
    }

    function findNextEpisode(seriesItem, currentEpisode) {
        if (!seriesItem.episodes) return null;
        let episodesArray = Array.isArray(seriesItem.episodes) ? seriesItem.episodes : Object.values(seriesItem.episodes);
        episodesArray = episodesArray.map(ep => ({...ep, season: (ep.season == null ? 1 : ep.season) }));
        
        episodesArray.sort((a, b) => a.season - b.season || a.episode - b.episode);
        const currentIndex = episodesArray.findIndex(ep => ep.season == currentEpisode.season && ep.episode == currentEpisode.episode);
        if (currentIndex > -1 && currentIndex < episodesArray.length - 1) {
            return episodesArray[currentIndex + 1];
        }
        return null;
    }
    
    function playSeriesEpisode(seriesItem, episode) {
        const isLocked = (seriesItem.isPremium || episode.isPremium) && !isPremiumUser;
        if (isLocked) {
             showToast("Premium Episode. Please upgrade.");
             setTimeout(() => navigateTo('premium'), 1000);
             return;
        }

        currentContent = seriesItem;
        addToWatchHistory(seriesItem);

        const cleanEpisode = { ...episode, season: (episode.season == null ? 1 : episode.season) };

        handleAdDisplay(seriesItem, cleanEpisode);
    }
    
    function switchSeriesEpisodeInPlayer(seriesItem, episode) {
        const page = document.getElementById('series-player-page');
        const errorOverlay = page.querySelector('.player-error-overlay');
        const loadingOverlay = page.querySelector('.player-loading-overlay');
        const videoElement = document.getElementById('series-player-element');
        const iframeElement = document.getElementById('series-player-iframe');

        errorOverlay.classList.remove('show');
        document.getElementById('series-player-title').textContent = `${seriesItem.title} - S${episode.season} E${episode.episode}: ${episode.title || ''}`;
        
        if (seriesPlayer) { seriesPlayer.destroy(); seriesPlayer = null; }
        if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }

        if (isDirectVideoFile(episode.link)) {
            iframeElement.classList.remove('active');
            iframeElement.src = "";
            videoElement.style.display = 'block';
            loadingOverlay.classList.add('show');

            const oldVideo = videoElement;
            const newVideo = oldVideo.cloneNode(true);
            newVideo.style.filter = "brightness(1)";
            oldVideo.parentNode.replaceChild(newVideo, oldVideo);
            const cleanVideoElement = newVideo;

            loadVideoSource(episode.link, cleanVideoElement, null, () => {
                 errorOverlay.classList.add('show'); loadingOverlay.classList.remove('show');
            });
            cleanVideoElement.onerror = () => { errorOverlay.classList.add('show'); loadingOverlay.classList.remove('show'); };
            
            const autoPlayConfig = { ...playerConfig, autoplay: true, muted: false };
            seriesPlayer = new Plyr(cleanVideoElement, autoPlayConfig);
            addPlayerWatermark(seriesPlayer);
            addScreenFitControl(seriesPlayer); 
            setupProfessionalPlayerFeatures(seriesPlayer, `${seriesItem.id}_s${episode.season}_e${episode.episode}`);
            seriesPlayer.on('playing', () => loadingOverlay.classList.remove('show'));
            seriesPlayer.on('ended', () => {
                if (document.getElementById('series-autoplay-switch').checked) {
                    const nextEp = findNextEpisode(seriesItem, episode);
                    if (nextEp) setTimeout(() => switchSeriesEpisodeInPlayer(seriesItem, nextEp), 500);
                    else showToast("You've finished the series!");
                }
            });
            seriesPlayer.on('ready', () => attemptAutoplay(seriesPlayer));
            setupPlayerFullscreenRotation(seriesPlayer);
        } else {
            videoElement.style.display = 'none';
            loadingOverlay.classList.remove('show');
            iframeElement.src = episode.link;
            iframeElement.classList.add('active');
        }

        document.getElementById('series-player-watchlist-btn').onclick = () => toggleWatchlist(seriesItem);
        document.getElementById('series-player-share-btn').onclick = () => shareContent(seriesItem);
        document.getElementById('series-player-like-btn').onclick = () => handleContentInteraction('like', seriesItem);
        document.getElementById('series-player-dislike-btn').onclick = () => handleContentInteraction('dislike', seriesItem);
        
        loadInteractionStatus(seriesItem, 'series-player');
        updateSeriesPlayerWatchlistButton(seriesItem);
        
        let episodesArray = Array.isArray(seriesItem.episodes) ? seriesItem.episodes : Object.values(seriesItem.episodes);
        episodesArray = episodesArray.map(ep => ({...ep, season: (ep.season == null ? 1 : ep.season) })); 

        const episodeListContainer = document.getElementById('series-player-episode-list');
        episodeListContainer.innerHTML = '';
        const list = document.createElement('div'); 
        list.className = 'episode-list';
        
        episodesArray.sort((a,b) => a.season - b.season || a.episode - b.episode).forEach(ep => {
            const epLocked = (seriesItem.isPremium || ep.isPremium) && !isPremiumUser;
            const epItem = document.createElement('div'); 
            epItem.className = 'episode-item';
            epItem.tabIndex = 0;
            if (ep.episode == episode.episode && ep.season == episode.season) epItem.classList.add('active');
            
            epItem.innerHTML = `
                <div class="episode-thumbnail">
                    <img src="${ep.thumbnail || seriesItem.poster}" alt="">
                    <div class="play-icon-wrapper"><i class="fas ${epLocked ? 'fa-lock' : 'fa-play-circle'}"></i></div>
                </div>
                <div class="episode-details">
                    <div class="title">E${ep.episode}: ${ep.title || 'Episode ' + ep.episode}</div>
                </div>`;
            epItem.onclick = () => playSeriesEpisode(seriesItem, ep);
            list.appendChild(epItem);
        });
        episodeListContainer.appendChild(list);
    }
    
    function updateSeriesPlayerWatchlistButton(item) {
        const btn = document.getElementById('series-player-watchlist-btn'); if (!btn || !item) return;
        const icon = btn.querySelector('i'); const isIn = watchlist.some(w => w.id === item.id);
        if (isIn) { btn.classList.add('active'); icon.className = 'fas fa-check'; } else { btn.classList.remove('active'); icon.className = 'fas fa-plus'; }
    }

    function updateSeriesDetailWatchlistButton(item) {
        const btn = document.getElementById('series-detail-watchlist-btn'); if (!btn || !item) return;
        const icon = btn.querySelector('i'); const isIn = watchlist.some(w => w.id === item.id);
        if (isIn) { btn.classList.add('active'); icon.className = 'fas fa-check'; } else { btn.classList.remove('active'); icon.className = 'fas fa-plus'; }
    }
    
    function createLiveTvBrowseCard(channel) {
        const card = document.createElement('div');
        card.className = 'livetv-browse-card';
        card.tabIndex = 0;
        card.onclick = () => showLiveTvPlayer(channel);
        card.innerHTML = `
            <div class="livetv-browse-card-logo-wrapper">
                <div class="live-badge">LIVE</div>
                <img src="${channel.logoUrl}" alt="${channel.name}">
            </div>
            <p class="livetv-browse-card-name">${channel.name}</p>
        `;
        return card;
    }

    function renderLiveTvBrowsePage() {
        const container = document.getElementById('category-container');
        container.innerHTML = '';
        container.className = '';
        
        const liveTvCategories = [...new Set(allLiveTvChannels.map(c => c.category))].filter(Boolean);
        if (liveTvCategories.length === 0) {
            container.innerHTML = `<div class="empty-state" style="padding-top: 50px;"><i class="fas fa-tv empty-icon"></i><p>No TV Channels Available</p><span>Check back later for live channels.</span></div>`;
            return;
        }

        const filterTabs = document.createElement('div');
        filterTabs.className = 'livetv-browse-filter-tabs';
        const tabIcons = { "News": "fa-newspaper", "Sports": "fa-basketball", "Entertainment": "fa-film", "Kids & Cartoon": "fa-child", "TV Show": "fa-tv" };
        liveTvCategories.forEach(catName => {
            const tab = document.createElement('div');
            tab.className = 'livetv-browse-filter-tab';
            const iconClass = tabIcons[catName] || 'fa-folder';
            tab.innerHTML = `<i class="fas ${iconClass}"></i> ${catName}`;
            tab.onclick = () => renderLiveTvCategoryPage(catName);
            filterTabs.appendChild(tab);
        });
        container.appendChild(filterTabs);

        liveTvCategories.forEach(categoryName => {
            const categoryChannels = allLiveTvChannels.filter(c => c.category === categoryName);
            if (categoryChannels.length === 0) return;

            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `
                <div class="category-header">
                    <h2 class="category-title">${categoryName}</h2>
                    <a href="#" class="see-all-btn" onclick="event.preventDefault(); renderLiveTvCategoryPage('${categoryName}')">See all</a>
                </div>
                <div class="content-slider"></div>`;
            
            const slider = section.querySelector('.content-slider');
            categoryChannels.slice(0, 10).forEach(channel => {
                slider.appendChild(createLiveTvBrowseCard(channel));
            });
            container.appendChild(section);
        });
    }

    function renderLiveTvCategoryPage(categoryName, isFromHistory = false) {
        if (!isFromHistory) {
            navigationHistory.push({ page: 'livetv-category', category: categoryName });
        }
        document.getElementById('home-page').style.display = 'block';
        document.getElementById('home-header').style.display = 'none';
        const container = document.getElementById('category-container');
        container.innerHTML = '';
        container.className = 'content-grid livetv-grid';

        const pageHeader = document.getElementById('page-header');
        pageHeader.classList.remove('hidden');
        pageHeader.classList.add('centered-header');
        pageHeader.querySelector('i').style.display = 'none';
        document.getElementById('page-title').textContent = categoryName;

        document.getElementById('back-btn').style.display = 'block';
        document.getElementById('bottom-nav').style.display = 'none';

        const categoryChannels = allLiveTvChannels.filter(c => c.category === categoryName);
        if (categoryChannels.length > 0) {
            categoryChannels.forEach(channel => container.appendChild(createLiveTvBrowseCard(channel)));
        } else {
            container.className = '';
            container.innerHTML = `<div class="empty-state"><p>No channels found in ${categoryName}</p></div>`;
        }
        window.scrollTo(0, 0);
    }
    
    function showLiveTvPlayer(channel) {
        navigateTo('livetv-player');
        setTimeout(() => {
            switchLiveTvChannel(channel);
        }, 100);
    }

    function switchLiveTvChannel(channel) {
        currentContent = channel;
        document.getElementById('livetv-player-placeholder').style.display = 'none';
        const page = document.getElementById('livetv-player-page');
        const videoElement = page.querySelector('#livetv-player-element');
        const iframeElement = page.querySelector('#livetv-player-iframe');
        const errorOverlay = page.querySelector('.player-error-overlay');
        const loadingOverlay = page.querySelector('.player-loading-overlay');
        
        errorOverlay.classList.remove('show');

        if (liveTvPlayer) { liveTvPlayer.destroy(); liveTvPlayer = null; }

        if (isDirectVideoFile(channel.streamUrl)) {
            iframeElement.classList.remove('active');
            iframeElement.src = "";
            videoElement.style.display = 'block';
            loadingOverlay.classList.add('show');
            
            videoElement.src = "";
            videoElement.load();
            
            loadVideoSource(channel.streamUrl, videoElement, null, () => {
                 errorOverlay.classList.add('show'); loadingOverlay.classList.remove('show');
            });
            videoElement.onerror = () => { errorOverlay.classList.add('show'); loadingOverlay.classList.remove('show'); };
            
            const autoPlayConfig = { ...playerConfig, autoplay: true, muted: false };
            liveTvPlayer = new Plyr(videoElement, autoPlayConfig);
            addPlayerWatermark(liveTvPlayer);
            addScreenFitControl(liveTvPlayer);
            liveTvPlayer.on('playing', () => loadingOverlay.classList.remove('show'));
            liveTvPlayer.on('ready', () => attemptAutoplay(liveTvPlayer));
            setupPlayerFullscreenRotation(liveTvPlayer);

        } else {
            videoElement.style.display = 'none';
            loadingOverlay.classList.remove('show');
            iframeElement.src = channel.streamUrl;
            iframeElement.classList.add('active');
        }

        document.getElementById('livetv-player-title').textContent = channel.name;
        document.getElementById('livetv-player-share-btn').onclick = () => shareContent(channel);
        document.getElementById('livetv-player-like-btn').onclick = () => handleContentInteraction('like', channel);
        document.getElementById('livetv-player-dislike-btn').onclick = () => handleContentInteraction('dislike', channel);
        
        loadInteractionStatus(channel, 'livetv-player');
        
        const moreChannelsSlider = document.getElementById('livetv-player-more-channels-slider');
        moreChannelsSlider.innerHTML = '';
        const otherChannels = allLiveTvChannels.filter(c => c.id !== channel.id).slice(0, 10);
        otherChannels.forEach(otherChannel => {
            const card = createLiveTvBrowseCard(otherChannel);
            card.onclick = () => switchLiveTvChannel(otherChannel);
            moreChannelsSlider.appendChild(card);
        });
    }
    
    function applyTheme(themeName) {
        document.body.dataset.theme = themeName;
        localStorage.setItem('nareshworld_theme', themeName);

        document.querySelectorAll('#theme-grid-container .theme-option').forEach(el => {
            el.classList.toggle('active', el.dataset.theme === themeName);
        });
    }

    function applyMode(modeName) {
        document.body.dataset.mode = modeName;
        localStorage.setItem('nareshworld_mode', modeName);
        document.getElementById('mode-switch').checked = (modeName === 'light');
    }

    function setupThemeControls() {
        const themeContainer = document.getElementById('theme-grid-container');
        const modeSwitch = document.getElementById('mode-switch');

        themeContainer.addEventListener('click', (e) => {
            const themeOption = e.target.closest('.theme-option');
            if (themeOption) {
                applyTheme(themeOption.dataset.theme);
            }
        });

        modeSwitch.addEventListener('change', (e) => {
            applyMode(e.target.checked ? 'light' : 'dark');
        });
    }

    // =====================================
    // PREMIUM FEATURES IMPLEMENTATION
    // =====================================

    function renderPremiumPlans() {
        const container = document.getElementById('plans-container');
        container.innerHTML = '<div class="empty-state"><p>Loading Plans...</p></div>';

        database.ref('plans').once('value').then(snapshot => {
            container.innerHTML = '';
            if(!snapshot.exists()) {
                container.innerHTML = '<div class="empty-state"><p>No plans available right now.</p></div>';
                return;
            }

            snapshot.forEach(child => {
                const plan = child.val();
                const card = document.createElement('div');
                card.className = 'plan-card';
                
                card.innerHTML = `
                    <h2 style="color:white; font-size: 20px;">${plan.name}</h2>
                    <div class="plan-price">${plan.price}</div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check-circle"></i> ${plan.days} Days Validity</li>
                        <li><i class="fas fa-check-circle"></i> ${plan.devices} Device Limit</li>
                        <li><i class="fas fa-check-circle"></i> ${plan.description}</li>
                    </ul>
                    <button class="auth-btn" style="background: var(--premium-gold); color: black; font-weight:bold; margin-top:15px;" 
                        onclick="openPaymentModal('${plan.name}', '${plan.days}', '${plan.price}')">
                        BUY NOW
                    </button>
                `;
                container.appendChild(card);
            });
        });
    }

    function openPaymentModal(planName, days, price) {
        const modal = document.getElementById('payment-modal');
        const payAmount = document.getElementById('pay-amount');
        const payQr = document.getElementById('pay-qr-img');
        const payUpi = document.getElementById('pay-upi-id');
        const hiddenName = document.getElementById('selected-plan-name');
        const hiddenDays = document.getElementById('selected-plan-days');
        const hiddenPrice = document.getElementById('selected-plan-price');
        const utrInput = document.getElementById('payment-utr');

        database.ref('app_settings/payment').once('value').then(snapshot => {
            const data = snapshot.val();
            if(data) {
                payQr.src = data.qrCodeUrl;
                payUpi.textContent = data.upiId;
                payAmount.textContent = price;
                hiddenName.value = planName;
                hiddenDays.value = days;
                hiddenPrice.value = price;
                utrInput.value = '';
                
                modal.style.display = 'flex';
            } else {
                showToast("Payment details not configured by admin.");
            }
        });
    }

    function closePaymentModal() {
        document.getElementById('payment-modal').style.display = 'none';
    }

    function copyUPI() {
        const upi = document.getElementById('pay-upi-id').textContent;
        navigator.clipboard.writeText(upi).then(() => showToast('UPI ID Copied!'));
    }

    function submitPayment() {
        const utr = document.getElementById('payment-utr').value.trim();
        const planName = document.getElementById('selected-plan-name').value;
        const planDays = parseInt(document.getElementById('selected-plan-days').value);
        const planPrice = document.getElementById('selected-plan-price').value;
        const user = auth.currentUser;

        if(!utr) {
            showToast("Please enter Transaction/UTR ID");
            return;
        }

        const requestData = {
            userId: user.uid,
            userEmail: user.email,
            planName: planName,
            planDays: planDays,
            planPrice: planPrice,
            utr: utr,
            status: "pending",
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref('premium_requests').push(requestData).then(() => {
            showToast("Request Sent! Wait for Admin Approval.");
            closePaymentModal();
            goBack();
        }).catch(err => {
            showToast("Error sending request: " + err.message);
        });
    }

    // =====================================
    // ENHANCED REDEEM CODE FUNCTION (with expiry & usage limit)
    // =====================================
    function redeemCode() {
        const codeInput = document.getElementById('redeem-code-input').value.trim().toUpperCase();
        if (!codeInput) {
            showToast("Please enter a code.");
            return;
        }

        const user = auth.currentUser;
        if (!user || user.isAnonymous) {
            showToast("You must be logged in to redeem a code.");
            return;
        }

        const codeRef = database.ref('redeem_codes/' + codeInput);

        codeRef.once('value').then(snapshot => {
            const codeData = snapshot.val();
            
            if (!codeData) {
                showToast("Invalid code.");
                return;
            }

            // Check status
            if (codeData.status !== 'available') {
                showToast("This code has already been used.");
                return;
            }

            // Check expiry date (if set)
            if (codeData.expiryDate && codeData.expiryDate < Date.now()) {
                showToast("This code has expired.");
                return;
            }

            // Check usage limit
            const currentUses = codeData.usedCount || 0;
            const maxUses = codeData.maxUses || 1;
            if (currentUses >= maxUses) {
                showToast("This code has reached its usage limit.");
                // Mark as used if max reached
                codeRef.update({ status: 'used' });
                return;
            }

            // Calculate new expiry
            const daysToAdd = parseInt(codeData.days);
            let newExpiry = Date.now() + (daysToAdd * 24 * 60 * 60 * 1000);

            // If user already has premium, extend it
            if (isPremiumUser && subscriptionData && subscriptionData.expiryDate > Date.now()) {
                newExpiry = subscriptionData.expiryDate + (daysToAdd * 24 * 60 * 60 * 1000);
            }

            const subData = {
                isPremium: true,
                planName: 'Redeemed Code',
                expiryDate: newExpiry,
                startDate: Date.now(),
                deviceLimit: 5
            };

            const updates = {};
            updates['/users/' + user.uid + '/subscription'] = subData;
            
            // Update code usage
            const newUsedCount = currentUses + 1;
            updates['/redeem_codes/' + codeInput + '/usedCount'] = newUsedCount;
            updates['/redeem_codes/' + codeInput + '/usedBy'] = user.uid;
            updates['/redeem_codes/' + codeInput + '/usedAt'] = firebase.database.ServerValue.TIMESTAMP;
            
            if (newUsedCount >= maxUses) {
                updates['/redeem_codes/' + codeInput + '/status'] = 'used';
            }

            return database.ref().update(updates).then(() => {
                showToast(`Premium activated for ${daysToAdd} days!`);
                document.getElementById('redeem-code-input').value = '';
                goBack();
                checkPremiumStatus(user.uid);
            });

        }).catch(err => {
            console.error("Redeem Error: ", err);
            showToast("Error redeeming code. Please try again.");
        });
    }

    // =====================================
    // SHORTS TV FUNCTIONS
    // =====================================
    function loadShorts() {
        database.ref('shorts').orderByChild('timestamp').on('value', snapshot => {
            allShorts = [];
            snapshot.forEach(child => {
                allShorts.push({ id: child.key, ...child.val() });
            });
            allShorts.reverse(); // newest first
            if (document.getElementById('shorts-page').style.display === 'block') {
                renderShortsGrid();
            }
        });
    }

    function renderShortsGrid() {
        if (!shortsContainer) shortsContainer = document.getElementById('shorts-container');
        shortsContainer.innerHTML = '';
        if (allShorts.length === 0) {
            shortsContainer.innerHTML = `<div class="empty-state" style="height: 100%; display: flex; flex-direction: column; justify-content: center;"><i class="fas fa-clapperboard empty-icon"></i><p>No Shorts Available</p><span>Check back later for new shorts!</span></div>`;
            return;
        }
        allShorts.forEach(short => {
            const card = createShortCard(short);
            shortsContainer.appendChild(card);
        });
    }

    function createShortCard(short) {
        const card = document.createElement('div');
        card.className = 'short-card';
        card.style.cssText = `
            height: 100vh; width: 100%; scroll-snap-align: start; position: relative;
            display: flex; align-items: center; justify-content: center; background: #000;
        `;
        
        let lockOverlay = '';
        if (short.isPremium && !isPremiumUser) {
            lockOverlay = `<div class="premium-lock-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:5;">
                <i class="fas fa-lock" style="font-size: 48px; color: var(--premium-gold);"></i>
            </div>`;
        }
        
        card.innerHTML = `
            <video src="${short.videoUrl}" poster="${short.thumbnail}" loop muted playsinline 
                style="width: 100%; height: 100%; object-fit: contain; background: #000;"
                ${short.isPremium && !isPremiumUser ? '' : 'autoplay'}>
            </video>
            ${lockOverlay}
            <div class="short-overlay" style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: white; z-index: 2;">
                <h3 style="font-size: 16px; margin-bottom: 5px;">${short.title}</h3>
                <p style="font-size: 13px; opacity: 0.8;">${short.description || ''}</p>
                <div style="display: flex; gap: 15px; margin-top: 10px;">
                    <button class="action-icon-btn" onclick="event.stopPropagation(); toggleShortLike('${short.id}')"><i class="far fa-heart"></i> <span id="short-like-${short.id}">${short.likes || 0}</span></button>
                    <button class="action-icon-btn" onclick="event.stopPropagation(); shareContent({title: '${short.title}', link: '${short.videoUrl}'})"><i class="fas fa-share"></i></button>
                </div>
            </div>
        `;
        
        card.onclick = (e) => {
            if (e.target.closest('button')) return;
            if (short.isPremium && !isPremiumUser) {
                showToast("Premium short. Please upgrade.");
                navigateTo('premium');
                return;
            }
            openShortsPlayer(short);
        };
        
        return card;
    }

    function openShortsPlayer(startShort) {
        const playerPage = document.getElementById('shorts-player-page');
        const listContainer = document.getElementById('shorts-player-list');
        
        // Find index of the clicked short
        const startIndex = allShorts.findIndex(s => s.id === startShort.id);
        
        listContainer.innerHTML = '';
        allShorts.forEach((short, idx) => {
            const playerCard = createShortsPlayerCard(short, idx === startIndex);
            listContainer.appendChild(playerCard);
        });
        
        // Hide bottom nav and show player page
        document.getElementById('bottom-nav').style.display = 'none';
        playerPage.style.display = 'flex';
        
        // Scroll to the selected short
        setTimeout(() => {
            const cards = listContainer.children;
            if (cards[startIndex]) {
                cards[startIndex].scrollIntoView({ behavior: 'auto' });
                currentShortIndex = startIndex;
                // Play the current video
                const video = cards[startIndex].querySelector('video');
                if (video) {
                    video.play();
                    activeShortVideos.add(video);
                }
            }
        }, 50);
        
        // Add scroll listener to auto-play/pause
        listContainer.addEventListener('scroll', handleShortsScroll);
    }

    function createShortsPlayerCard(short, autoplay = false) {
        const card = document.createElement('div');
        card.className = 'shorts-player-card';
        card.style.cssText = `
            height: 100vh; width: 100%; scroll-snap-align: start; position: relative;
            display: flex; align-items: center; justify-content: center; background: #000;
        `;
        
        let lockOverlay = '';
        if (short.isPremium && !isPremiumUser) {
            lockOverlay = `<div class="premium-lock-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:5;">
                <i class="fas fa-lock" style="font-size: 48px; color: var(--premium-gold); margin-bottom: 20px;"></i>
                <button class="auth-btn" style="width: auto; padding: 12px 30px; background: var(--premium-gold); color: black;" onclick="event.stopPropagation(); navigateTo('premium')">Unlock Premium</button>
            </div>`;
        }
        
        card.innerHTML = `
            <video src="${short.videoUrl}" poster="${short.thumbnail}" loop playsinline 
                style="width: 100%; height: 100%; object-fit: contain; background: #000;"
                ${autoplay && (!short.isPremium || isPremiumUser) ? 'autoplay' : ''}>
            </video>
            ${lockOverlay}
            <div class="short-overlay" style="position: absolute; bottom: 80px; left: 0; right: 0; padding: 20px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: white; z-index: 2;">
                <h3 style="font-size: 18px; margin-bottom: 8px;">${short.title}</h3>
                <p style="font-size: 14px; opacity: 0.9;">${short.description || ''}</p>
            </div>
            <div style="position: absolute; right: 15px; bottom: 100px; display: flex; flex-direction: column; gap: 20px; z-index: 3;">
                <button class="action-icon-btn" style="background: rgba(0,0,0,0.5); border-radius: 50%; width: 48px; height: 48px;" onclick="toggleShortLike('${short.id}')">
                    <i class="far fa-heart" style="font-size: 24px;"></i>
                    <span id="short-player-like-${short.id}" style="color: white; margin-top: -5px;">${short.likes || 0}</span>
                </button>
                <button class="action-icon-btn" style="background: rgba(0,0,0,0.5); border-radius: 50%; width: 48px; height: 48px;" onclick="shareContent({title: '${short.title}', link: '${short.videoUrl}'})">
                    <i class="fas fa-share" style="font-size: 24px;"></i>
                </button>
            </div>
        `;
        
        return card;
    }

    function handleShortsScroll() {
        const container = document.getElementById('shorts-player-list');
        const cards = container.children;
        const containerHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        
        // Find which card is most visible
        let bestIndex = 0;
        let maxVisibility = 0;
        
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const rect = card.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, containerHeight) - Math.max(rect.top, 0);
            const visibility = visibleHeight / containerHeight;
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                bestIndex = i;
            }
        }
        
        if (bestIndex !== currentShortIndex) {
            // Pause previous video
            const prevCard = cards[currentShortIndex];
            if (prevCard) {
                const prevVideo = prevCard.querySelector('video');
                if (prevVideo) {
                    prevVideo.pause();
                    activeShortVideos.delete(prevVideo);
                }
            }
            
            // Play new video
            const newCard = cards[bestIndex];
            if (newCard) {
                const newVideo = newCard.querySelector('video');
                if (newVideo) {
                    // Check if premium locked
                    const short = allShorts[bestIndex];
                    if (!short.isPremium || isPremiumUser) {
                        newVideo.play().catch(e => console.log("Autoplay prevented:", e));
                        activeShortVideos.add(newVideo);
                    }
                }
            }
            
            currentShortIndex = bestIndex;
        }
    }

    function exitShortsPlayer() {
        const playerPage = document.getElementById('shorts-player-page');
        const listContainer = document.getElementById('shorts-player-list');
        
        // Pause all videos
        listContainer.querySelectorAll('video').forEach(v => {
            v.pause();
            activeShortVideos.delete(v);
        });
        
        // Remove scroll listener
        listContainer.removeEventListener('scroll', handleShortsScroll);
        
        playerPage.style.display = 'none';
        document.getElementById('bottom-nav').style.display = 'flex';
        
        // Refresh shorts grid if needed
        renderShortsGrid();
    }

    async function toggleShortLike(shortId) {
        const user = auth.currentUser;
        if (!user) {
            showToast("Please login to like shorts");
            return;
        }
        
        const short = allShorts.find(s => s.id === shortId);
        if (!short) return;
        
        if (short.isPremium && !isPremiumUser) {
            showToast("Premium short. Please upgrade.");
            return;
        }
        
        const likeCountSpan = document.getElementById(`short-like-${shortId}`) || document.getElementById(`short-player-like-${shortId}`);
        const heartIcon = likeCountSpan?.previousElementSibling;
        
        try {
            const userLikeRef = database.ref(`user_interactions/${user.uid}/${shortId}_short`);
            const shortRef = database.ref(`shorts/${shortId}`);
            
            const snapshot = await userLikeRef.once('value');
            const hasLiked = snapshot.val();
            
            if (hasLiked) {
                // Unlike
                await userLikeRef.remove();
                await shortRef.child('likes').set(firebase.database.ServerValue.increment(-1));
                if (heartIcon) heartIcon.className = 'far fa-heart';
                short.likes = (short.likes || 1) - 1;
            } else {
                // Like
                await userLikeRef.set(true);
                await shortRef.child('likes').set(firebase.database.ServerValue.increment(1));
                if (heartIcon) heartIcon.className = 'fas fa-heart';
                short.likes = (short.likes || 0) + 1;
            }
            
            // Update all like count displays
            document.querySelectorAll(`#short-like-${shortId}, #short-player-like-${shortId}`).forEach(el => {
                el.textContent = short.likes;
            });
            
        } catch (err) {
            console.error("Like error:", err);
            showToast("Could not update like");
        }
    }

</script>
</body>
</html>
