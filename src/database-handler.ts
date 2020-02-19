import {Database, OPEN_CREATE, OPEN_READWRITE} from "sqlite3";

export class DatabaseHandler {

    constructor() {
        const db = new Database("database.db", OPEN_READWRITE | OPEN_CREATE, (err: Error) => {
            if (err != undefined) {
                console.error(err.message);
            } else {
                console.log("Database connection established successfully")
            }
        })
    }
}