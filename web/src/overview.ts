import {ScoreboardRow, ServerProxy} from "./serverProxy";
import {autoinject, computedFrom} from 'aurelia-framework';
import {Router} from "aurelia-router";

@autoinject
export class Overview {
  private mScoreBoard: ScoreboardRow[] = [];

  constructor(private mRouter: Router) {}

  public async activate(): Promise<void> {
    this.mScoreBoard = await ServerProxy.getScoreboard();
  }

  public async reportResultClicked(): Promise<void> {
    this.mRouter.navigate("/report-result");
  }

  public async matchHistoryClicked(): Promise<void> {
    this.mRouter.navigate("/match-history");
  }

  @computedFrom("mScoreBoard")
  public get scoreboard(): ScoreboardRow[] {
    return this.mScoreBoard;
  }
}
