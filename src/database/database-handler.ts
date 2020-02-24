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
        return this.fetch(`select id, name from players`);
    }

    public async fetchMatches(): Promise<MatchRecord[]> {
        return this.fetch(`select date, winner, loser, winner_score, loser_score from matches`);
    }

    public async fetchPlayerFromId(player: number): Promise<PlayerRecord> {
        return this.fetchRow(`select id, name from players where id = ${player}`);
    }

    public async createPlayer(name: string): Promise<void> {
        return this.insert(`insert into players (name) values ('${name}')`);
    }

    public async recordMatch(match: Match): Promise<void> {
        if (match.winnerScore != undefined && match.loserScore != undefined) {
            return this.insert(
                `insert into matches (date, winner, loser, winner_score, loser_score) values ('${match.date}', ${match.winner}, ${match.loser}, ${match.winnerScore}, ${match.loserScore})`
            );
        } else {
            return this.insert(
                `insert into matches (date, winner, loser) values ('${match.date}', ${match.winner}, ${match.loser})`
            );
        }
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

    private fetchRow(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mDatabase.get(query, [], (error, result: any) => {
                if (error != undefined) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve(result);
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