import {Match, ScoreboardRow, ServerProxy} from "./serverProxy";
import {computedFrom} from "aurelia-framework";

export class MatchHistory {
  private mMatches: Match[]= [];

  public async activate(): Promise<void> {
    this.mMatches = await ServerProxy.getMatches();
  }

  @computedFrom("mScoreBoard")
  public get matches(): Match[] {
    return this.mMatches;
  }
}
