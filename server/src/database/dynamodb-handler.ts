import AWS from "aws-sdk"
import {DatabaseHandler} from "./database-handler";
import {MatchRecord, PlayerRecord} from "./records";
import {Match} from "../match";

export class DynamodbHandler implements DatabaseHandler {

    private mDatabase: AWS.DynamoDB.DocumentClient;
    private mHighestPlayerIndex: number = -1;

    constructor() {
        AWS.config.update({
            region: "us-east-1"
        });
        this.mDatabase = new AWS.DynamoDB.DocumentClient();

        this.fetchPlayers().then((records) => {
            records.forEach((record) => {
               if (record.id > this.mHighestPlayerIndex) {
                   this.mHighestPlayerIndex = record.id;
               }
            });
        });
    }

    public async fetchPlayers(): Promise<PlayerRecord[]> {
        return new Promise((resolve, reject) => {
            this.mDatabase.scan({TableName: "pingu-test"}, (error, data) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve(data.Items.map((item) => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    }));
                }
            });
        });
    }

    fetchMatches(): Promise<MatchRecord[]> {
        return new Promise((resolve, reject) => {
            this.mDatabase.scan({TableName: "pingu-test-2"}, (error, data) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve(data.Items.map((item) => {
                        return {
                            date: item.date,
                            winner: item.winner,
                            loser: item.loser,
                            winner_score: item.winner_score,
                            loser_score: item.loser_score,
                        }
                    }));
                }
            });
        });
    }

    fetchPlayerFromId(player: number): Promise<PlayerRecord> {
        return new Promise((resolve, reject) => {
            this.mDatabase.get({TableName: "pingu-test", Key: {id: player}}, (error, data) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve({
                        id: data.Item.id,
                        name: data.Item.name,
                    });
                }
            });
        });
    }

    createPlayer(name: string): Promise<void> {
        const data = {
            TableName: "pingu-test",
            Item: {
                "id": this.mHighestPlayerIndex + 1,
                "name": name
            }
        };
        return new Promise((resolve, reject) => {
            this.mDatabase.put(data, (error, data) => {
                if (error != undefined) {
                    console.error(error);
                    reject(error);
                } else {
                    this.mHighestPlayerIndex++;
                    resolve();
                }
            })
        });
    }

    recordMatch(match: Match): Promise<void> {
        const data = {
            TableName: "pingu-test-2",
            Item: {
                "date": match.date,
                "winner": match.winner,
                "loser": match.loser,
                "winner_score": match.winnerScore,
                "loser_score": match.loserScore
            }
        };
        return new Promise((resolve, reject) => {
            this.mDatabase.put(data, (error, data) => {
                if (error != undefined) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve();
                }
            })
        });
    }
}