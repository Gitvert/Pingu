import {ScoreboardRow, ServerProxy} from "../../serverProxy";
import {autoinject, computedFrom} from 'aurelia-framework';

@autoinject
export class Overview {
  private mScoreBoard: ScoreboardRow[] = [];

  constructor() {}

  public async activate(): Promise<void> {
    this.mScoreBoard = await ServerProxy.getScoreboard();
  }

  @computedFrom("mScoreBoard")
  public get scoreboard(): ScoreboardRow[] {
    return this.mScoreBoard;
  }

  @computedFrom("mScoreBoard")
  public get showScoreboard(): boolean {
    return this.mScoreBoard.length > 0;
  }
}
