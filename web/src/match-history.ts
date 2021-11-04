import {Match, Player, ScoreboardRow, ServerProxy} from "./serverProxy";
import {computedFrom} from "aurelia-framework";
import {match} from "assert";

interface MatchView {
  date: string;
  winner: string;
  winnerScore: number;
  loser: string
  loserScore: number;
}

export class MatchHistory {
  private mPlayers: Player[]= [];
  private mMatches: MatchView[]= [];

  public async activate(): Promise<void> {
    this.mPlayers = await ServerProxy.getPlayers();
    this.mMatches = (await ServerProxy.getMatches())
      .map((match) => {
        return {
          date: match.date,
          winner: this.mPlayers.find((player) => player.id === match.winner).name,
          winnerScore: match.winnerScore,
          loser: this.mPlayers.find((player) => player.id === match.loser).name,
          loserScore: match.loserScore
        };
      });
  }

  @computedFrom("mScoreBoard")
  public get matches(): MatchView[] {
    return this.mMatches;
  }

  @computedFrom("mPlayers")
  public get players(): Player[] {
    return this.mPlayers;
  }
}
