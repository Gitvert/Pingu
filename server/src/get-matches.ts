import {DatabaseHandler} from "./database/database-handler";
import {MatchResponse} from "./responses";

export function getMatches(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.fetchMatches().then((records) => {
        const responseBody: MatchResponse[] = records.map((r) => new MatchResponse(r.date, r.winner, r.loser, r.winner_score, r.loser_score));

        res.setHeader("Content-type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(responseBody));
    }).catch(() => {
        res.sendStatus(500);
    });
}