import {Database} from "sqlite3";
import {Match} from "./match";

export class DatabaseHandler {

    private mDatabase: Database;

    constructor() {
        this.mDatabase = new Database("database.db", (err: Error) => {
            if (err != undefined) {
                console.error(err.message);
            } else {
                console.log("Database connection established successfully")
            }
        })
    }

    public recordMatch(match: Match) {
        this.mDatabase.serialize(() => {
            this.mDatabase.each(
                `insert into matches (date, winner_user_id, loser_user_id) values (${match.date}, ${match.winner}, ${match.loser})`,
                (err => {
                    if (err != undefined) {
                        console.error(err.message);
                    }
                })
            )
        })
    }
}