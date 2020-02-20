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
        this.mDatabase = new Database("database.db", (error) => {
            if (error != undefined) {
                console.error(error.message);
            } else {
                console.log("Database connection established successfully")
                this.mDatabase.run("PRAGMA foreign_keys = ON;");
            }
        })
    }

    public async createUser(name: string): Promise<void> {
        return await this.insert(`insert into players (name) values ('${name}')`);
    }

    public async fetchPlayers(): Promise<Player[]> {
        const playerRecords: PlayerRecord[] = await this.fetch(`select id, name from players`);
        return playerRecords.map(record => {
            return new Player(record.id, record.name);
        });
    }

    public async recordMatch(match: Match): Promise<void> {
        return this.insert(`insert into matches (date, winner_user_id, loser_user_id) values ('${match.date}', ${match.winner}, ${match.loser})`);
    }

    private fetch(query: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.mDatabase.all(query, [], (error, rows: any[]) => {
                if (error != undefined) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    private insert(query: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.mDatabase.run(query, (error => {
                if (error != undefined) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve();
                }
            }));
        });
    }
}