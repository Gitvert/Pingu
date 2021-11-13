import {Player} from "./player";
import {Match} from "./match";
import {Elo} from "./elo";
import {ScoreboardResponse} from "./responses";
import {ResponseHelper} from "./ResponseHelper";
import {DatabaseHandler} from "./database/database-handler";

export function getScoreboard(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.fetchPlayers().then((playerRecords) => {
        databaseHandler.fetchMatches().then((matchRecords) => {
            const players = new Map(playerRecords.map((r) => [r.id, new Player(r.id, r.name)]));

            const matches: Match[] = matchRecords.map((r) => new Match(r.date, r.winner, r.loser, r.winner_score, r.loser_score));

            matches.forEach((match) => {
                Elo.updateEloRating(players.get(match.winner), players.get(match.loser));
            });

            const responseBody: ScoreboardResponse[] = [...players.values()].map((p) => {
                return new ScoreboardResponse(p.id, p.name, p.rating, p.wins, p.losses);
            }).sort((r1, r2) => r2.rating - r1.rating);

            ResponseHelper.send(res, responseBody);
        }).catch(() => {
            res.sendStatus(500);
        });
    }).catch(() => {
        res.sendStatus(500);
    });
}