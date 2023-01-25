import axios from "axios";
import * as environment from '../config/environment.json';

export interface Match {
  date: string;
  loser: number;
  loserScore: number;
  winner: number;
  winnerScore: number;
}

export interface Player {
  id: number;
  name: string;
}

export interface ScoreboardRow {
  id: number;
  name: string;
  rating: number;
  wins: number;
  losses: number;
}

const serverHost = `http://${window.location.hostname}:8080`;

export class ServerProxy {
  static async getMatches(): Promise<Match[]> {
    return (await axios.get(`${serverHost}/matches`)).data as Match[];
  }

  static async getPlayers(): Promise<Player[]> {
    return (await axios.get(`${serverHost}/players`)).data as Player[];
  }

  static async getScoreboard(year: number): Promise<ScoreboardRow[]> {
    return (await axios.get(`${serverHost}/scoreboard`, {params: {year}})).data as ScoreboardRow[];
  }

  static async postMatch(winner: number, loser: number, winnerScore: number, loserScore: number): Promise<void> {
    return await axios.post(`${serverHost}/match`, {winner, loser, winnerScore, loserScore});
  }

  static async createPlayer(name: string): Promise<void> {
    return await axios.post(`${serverHost}/player`, {name});
  }
}
