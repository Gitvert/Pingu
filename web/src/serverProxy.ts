import axios from "axios";

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

export class ServerProxy {
  static async getMatches(): Promise<Match[]> {
    return (await axios.get("http://localhost:8080/matches")).data as Match[];
  }

  static async getPlayers(): Promise<Player[]> {
    return (await axios.get("http://localhost:8080/players")).data as Player[];
  }

  static async getScoreboard(): Promise<ScoreboardRow[]> {
    return (await axios.get("http://localhost:8080/scoreboard")).data as ScoreboardRow[];
  }

  static async postMatch(winner: number, loser: number, winnerScore: number, loserScore: number): Promise<void> {
    await axios.post("http://localhost:8080/match", {winner, loser, winnerScore, loserScore});
  }
}
