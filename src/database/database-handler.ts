import {Database} from "sqlite3";
import {Match} from "../match";
import {MatchRecord, PlayerRecord} from "./records";

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

    public async fetchPlayers(): Promise<PlayerRecord[]> {
        return await this.fetch(`select id, name from players`);
    }

    public async fetchMatches(): Promise<MatchRecord[]> {
        return await this.fetch(
            `select date, winner.name as winner, loser.name as loser from matches 
            inner join players winner on matches.winner = winner.id inner join players loser on matches.loser = loser.id`
        );
    }

    public async createUser(name: string): Promise<void> {
        return await this.insert(`insert into players (name) values ('${name}')`);
    }

    public async recordMatch(match: Match): Promise<void> {
        return this.insert(`insert into matches (date, winner, loser) values ('${match.date}', ${match.winner}, ${match.loser})`);
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