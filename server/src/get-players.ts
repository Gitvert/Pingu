import {PlayerResponse} from "./responses";
import {ResponseHelper} from "./ResponseHelper";
import {DatabaseHandler} from "./database/database-handler";

export function getPlayers(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.fetchPlayers().then((records) => {
        const responseBody: PlayerResponse[] = records.map((r) =>  new PlayerResponse(r.id, r.name));

        ResponseHelper.send(res, responseBody);
    }).catch(() => {
        res.sendStatus(500);
    });
}