import {MatchRecord, PlayerRecord} from "./records";
import {Match} from "../match";

export interface DatabaseHandler {
    fetchPlayers(): Promise<PlayerRecord[]>;
    fetchMatches(): Promise<MatchRecord[]>;
    fetchPlayerFromId(player: number): Promise<PlayerRecord>;
    createPlayer(name: string): Promise<void>;
    recordMatch(match: Match): Promise<void>;
}