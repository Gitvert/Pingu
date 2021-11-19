import {MatchResponse} from "./responses";
import {ResponseHelper} from "./ResponseHelper";
import {DatabaseHandler} from "./database/database-handler";

export function getMatches(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.fetchMatches().then((records) => {
        const responseBody: MatchResponse[] = records
            .map((r) => new MatchResponse(r.date, r.winner, r.loser, r.winner_score, r.loser_score))
            .sort((r1, r2) => new Date(r2.date).getTime() - new Date(r1.date).getTime());

        ResponseHelper.send(res, responseBody);
    }).catch(() => {
        res.sendStatus(500);
    });
}