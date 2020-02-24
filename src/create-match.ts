import {DatabaseHandler} from "./database/database-handler";
import {Match} from "./match";
import request from "request";

const config = require("./pingu-config.json");

export function createMatch(req: any, res: any, databaseHandler: DatabaseHandler) {
    const winnerId: number = req.body.winner;
    const loserId: number = req.body.loser;
    const winnerScore: number = req.body.winnerScore;
    const loserScore: number = req.body.loserScore;

    databaseHandler.recordMatch(new Match(new Date().toISOString(), winnerId, loserId, winnerScore, loserScore)).then(() => {
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