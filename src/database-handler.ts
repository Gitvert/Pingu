import {Database} from "sqlite3";
import {Match} from "./match";
import {Player} from "./player";

export interface PlayerRecord {
    id: number;
    name: string;
}

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

    public createUser(name: string): void {
        this.insert(`insert into players (name) values ('${name}')`);
    }

    public fetchUsers(): Player[] {
        const playerRecords: PlayerRecord[] = this.fetch(`select id, name from players`);

        return playerRecords.map(record => {
            return new Player(record.id, record.name);
        });
    }

    public recordMatch(match: Match): void {
        this.insert(`insert into matches (date, winner_user_id, loser_user_id) values ('${match.date}', ${match.winner}, ${match.loser})`);
    }

    private fetch(query: string): PlayerRecord[] {
        this.mDatabase.all(query, [], (err, rows: PlayerRecord[]) => {
            if (err != undefined) {
                console.error(err.message);
            } else {
                return rows;
            }
        });

        return [];
    }

    private insert(query: string): void {
        this.mDatabase.serialize(() => {
            this.mDatabase.each(
                query,
                (err => {
                    if (err != undefined) {
                        console.error(err.message);
                    }
                })
            )
        })
    }
}