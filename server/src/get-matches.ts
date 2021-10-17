import {DatabaseHandler} from "./database/database-handler";
import {MatchResponse} from "./responses";
import {ResponseHelper} from "./ResponseHelper";

export function getMatches(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.fetchMatches().then((records) => {
        const responseBody: MatchResponse[] = records.map((r) => new MatchResponse(r.date, r.winner, r.loser, r.winner_score, r.loser_score));

        ResponseHelper.send(res, responseBody);
    }).catch(() => {
        res.sendStatus(500);
    });
}