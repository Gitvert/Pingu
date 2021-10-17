import {PlayerResponse} from "./responses";
import {DatabaseHandler} from "./database/database-handler";
import {ResponseHelper} from "./ResponseHelper";

export function getPlayers(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.fetchPlayers().then((records) => {
        const responseBody: PlayerResponse[] = records.map((r) =>  new PlayerResponse(r.id, r.name));

        ResponseHelper.send(res, responseBody);
    }).catch(() => {
        res.sendStatus(500);
    });
}