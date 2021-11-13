import AWS, {DynamoDB} from "aws-sdk"
import {DatabaseHandler} from "./database-handler";
import {MatchRecord, PlayerRecord} from "./records";
import {Match} from "../match";

export class DynamodbHandler implements DatabaseHandler {

    private mDatabase: AWS.DynamoDB.DocumentClient;

    constructor() {
        AWS.config.update({
            region: "us-east-1"
        });
        this.mDatabase = new AWS.DynamoDB.DocumentClient();
    }

    public async fetchPlayers(): Promise<PlayerRecord[]> {
        return new Promise((resolve, reject) => {
            this.mDatabase.query({TableName: "pingu-test"}, (error, data) => {
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

    createPlayer(name: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    fetchMatches(): Promise<MatchRecord[]> {
        return Promise.resolve([]);
    }

    fetchPlayerFromId(player: number): Promise<PlayerRecord> {
        return Promise.resolve(undefined);
    }

    recordMatch(match: Match): Promise<void> {
        return Promise.resolve(undefined);
    }
}