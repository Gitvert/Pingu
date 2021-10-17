import {PlayerResponse} from "./responses";
import {DatabaseHandler} from "./database/database-handler";

export function getPlayers(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.fetchPlayers().then((records) => {
        const responseBody: PlayerResponse[] = records.map((r) =>  new PlayerResponse(r.id, r.name));

        res.setHeader("Content-type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(responseBody));
    }).catch(() => {
        res.sendStatus(500);
    });
}