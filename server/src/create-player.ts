import {DatabaseHandler} from "./database/database-handler";

export function createPlayer(req: any, res: any, databaseHandler: DatabaseHandler) {
    databaseHandler.createPlayer(req.body.name.trim()).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        if (error.toString().includes("UNIQUE constraint failed")) {
            res.sendStatus(409);
        } else {
            res.sendStatus(500);
        }
    });
}