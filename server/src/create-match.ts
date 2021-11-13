import {DatabaseHandler} from "./database/database-handler";
import {Match} from "./match";
import request from "request";

const config = require("./pingu-config.json");

export function createMatch(req: any, res: any, databaseHandler: DatabaseHandler) {
    const winnerId: number = req.body.winner;
    const loserId: number = req.body.loser;
    const winnerScore: number = req.body.winnerScore;
    const loserScore: number = req.body.loserScore;

    if (!validateScore(winnerScore, loserScore)) {
        res.sendStatus(400);
        return;
    }

    databaseHandler.recordMatch(new Match(new Date().toLocaleString(), winnerId, loserId, winnerScore, loserScore)).then(() => {

        res.sendStatus(200);

        databaseHandler.fetchPlayerFromId(winnerId).then((winner) => {
            databaseHandler.fetchPlayerFromId(loserId).then((loser) => {
                let slackText;
                if (winnerScore != undefined && loserScore != undefined) {
                    slackText = `${winner.name} won over ${loser.name} with ${winnerScore} - ${loserScore}`;
                } else {
                    slackText = `${winner.name} won over ${loser.name}`;
                }

                request.post(config.slackUrl, {
                    json: {
                        text: slackText
                    }
                });
            });
        });
    }).catch((error) => {
        if (error.toString().includes("FOREIGN KEY constraint failed")) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    });
}

function validateScore(winnerScore: number, loserScore: number): boolean {
    if (winnerScore == undefined && loserScore == undefined) {
        return true;
    }

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