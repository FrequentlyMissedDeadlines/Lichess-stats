const lichessApi = require('./lichess-api');
const stats = require('./stats');

LichessStats = (username, cb) => {
  lichessApi.getAllUserGames(username, games => {
    cb(stats.getStats(games, username));
  });
};

Winrate = stats.WinRate;
