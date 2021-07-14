const https = require('https');
const parser = require('chess-pgn-parser');

const defaultErrorHandler = (error) => {
    console.error(error)
};

const getAllUserGames = (username, onSuccess, onError = defaultErrorHandler) => {
    const options = {
        hostname: 'lichess.org',
        port: 443,
        path: '/api/games/user/' + username + '?opening=true',
        method: 'GET'
    };

    const req = https.request(options, res => {
        if (res.statusCode == 200) {
            var data = [];
            res.on('data', d => {
                data.push(d);
            }).on('end', function() {
                var buffer = Buffer.concat(data);
                const PGNgames = buffer.toString().split("\n\n\n");
                var games = [];
                for (var i = 0 ; i < PGNgames.length - 1 ; i++) {
                    games.push(JSON.parse(parser.pgn2json(PGNgames[i])));
                }
                onSuccess(games);
            });
        }
    });
    req.on('error', onError);
    req.end();
};

exports.getAllUserGames = getAllUserGames;