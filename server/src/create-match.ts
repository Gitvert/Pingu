import {Player} from "./player";
import {Match} from "./match";
import {Elo} from "./elo";
import {getPlayersWithElo} from "./get-scoreboard";
import request from "request";
import {DatabaseHandler} from "./database/database-handler";
import {Environment} from "./main";
import {ScoreboardResponse} from "./responses";
import {ResponseHelper} from "./ResponseHelper";

const config = require("./pingu-config.json");

export function createMatch(req: any, res: any, databaseHandler: DatabaseHandler, environment: Environment) {
    const winnerId: number = req.body.winner;
    const loserId: number = req.body.loser;
    const winnerScore: number = req.body.winnerScore;
    const loserScore: number = req.body.loserScore;

    if (isNaN(winnerId) || isNaN(loserId) || isNaN(winnerScore) || isNaN(loserScore)) {
        res.sendStatus(400);
        return;
    }

    if (!validateScore(winnerScore, loserScore)) {
        res.sendStatus(400);
        return;
    }

    const matchDate = new Date().toISOString().split('.')[0].replace('T', ' ');
    const match: Match = new Match(matchDate, winnerId, loserId, winnerScore, loserScore);
    let ratingChange: number = undefined;

    getPlayersWithElo(databaseHandler).then(
        (players) => {
            ratingChange = Elo.updateEloRating(
                players.get(winnerId),
                players.get(loserId),
            );
        }
    ).catch(() => {});

    databaseHandler.recordMatch(match).then(() => {

        res.sendStatus(200);

        if (environment == Environment.PROD) {
            postToSlack(winnerId, loserId, winnerScore, loserScore, ratingChange, databaseHandler);
        }
    }).catch((error) => {
        if (error.toString().includes("FOREIGN KEY constraint failed")) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    });
}

function validateScore(winnerScore: number, loserScore: number): boolean {
    if ((winnerScore == undefined || loserScore == undefined)) {
        return false;
    }

    if (winnerScore <= loserScore) {
        return false;
    }

    if (winnerScore < 11) {
        return false;
    }

    if (winnerScore > 11 && winnerScore - loserScore !== 2) {
        return false;
    }

    if (winnerScore === 11 && loserScore > 9) {
        return false;
    }

    return true;
}

function postToSlack(
    winnerId: number,
    loserId: number,
    winnerScore: number,
    loserScore: number,
    ratingChange: number,
    databaseHandler: DatabaseHandler
) {
    databaseHandler.fetchPlayerFromId(winnerId).then((winner) => {
        databaseHandler.fetchPlayerFromId(loserId).then((loser) => {
            const winnerRatingChangeText = ratingChange ? `(+${ratingChange})` : "";
            const loserRatingChangeText = ratingChange ? `(-${ratingChange})` : "";
            const scoreText = winnerScore && loserScore ? ` with ${winnerScore} - ${loserScore}` : "";

            const slackText = `${winner.name}${winnerRatingChangeText} won over ${loser.name}${loserRatingChangeText}${scoreText}`;

            request.post(
                "https://slack.com/api/chat.postMessage",
                {
                    headers: {
                        "Authorization": `Bearer ${config.slackBearerToken}`,
                        "content-type": "application/json"
                    },
                    json: {
                        text: slackText,
                        channel: `${config.slackChannelId}`
                    },
                }
            );
        });
    });
}