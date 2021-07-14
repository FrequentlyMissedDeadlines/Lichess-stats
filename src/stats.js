class WinRate {
    constructor(win = 0, draw = 0, lose = 0) {
        this.win = win;
        this.lose = lose;
        this.draw = draw;
    }

    addGameResult(game, username) {
        if (game.str.Result === "1/2-1/2") {
            this.draw++;
        } else if ((game.str.Result === "0-1" && game.str.White === username) || (game.str.Result === "1-0" && game.str.Black === username)) {
            this.lose++;
        } else {
            this.win++;
        }
    }

    toString() {
        const total = this.win + this.draw + this.lose;
        return Math.round(100 * (this.win / total)) + "% " + Math.round(100 * (this.draw / total)) + "% " + Math.round(100 * (this.lose / total)) + "%";
    }

    static compare (a, b) {
        if (a.win / (a.win + a.draw + a.lose) < b.win / (b.win + b.draw + b.lose)) {
            return -1;
        }
        if (a.win / (a.win + a.draw + a.lose) > b.win / (b.win + b.draw + b.lose)) {
            return 1;
        }
        if (a.win / (a.win + a.draw + a.lose) === b.win / (b.win + b.draw + b.lose)) {
            if (a.lose / (a.win + a.draw + a.lose) < b.lose / (b.draw + b.draw + b.lose)) {
                return 1;
            }
            if (a.lose / (a.win + a.draw + a.lose) > b.lose / (b.draw + b.draw + b.lose)) {
                return -1;
            }
            if (a.lose / (a.win + a.draw + a.lose) === b.lose / (b.draw + b.draw + b.lose)) {
                if (a.draw / (a.win + a.draw + a.lose) < b.draw / (b.draw + b.draw + b.lose)) {
                    return -1;
                }
                if (a.draw / (a.win + a.draw + a.lose) > b.draw / (b.draw + b.draw + b.lose)) {
                    return 1;
                }
                return 0;
            }
            return 0;
        }
        return 0;
    }
};

const getStats = (games, username) => {
    console.log("Games:", games.length);

    const openings = {};
    games.forEach(game => {
        if (!openings[game.str.Opening]) {
            openings[game.str.Opening] = new WinRate();
            openings[game.str.Opening].ECO = game.str.ECO;
        }
        openings[game.str.Opening].addGameResult(game, username);
    });

    const sortedOpenings = [];
    Object.keys(openings).forEach(o => {
        const copy = JSON.parse(JSON.stringify(openings[o]));
        copy.Opening = o;
        sortedOpenings.push(copy);
    });

    sortedOpenings.sort(WinRate.compare);
    sortedOpenings.forEach(o => {
        console.log("[" + o.ECO + "] " + o.Opening + ": " + new WinRate(o.win, o.draw, o.lose).toString());
    });
    return sortedOpenings;
};

exports.getStats = getStats;
exports.WinRate = WinRate;