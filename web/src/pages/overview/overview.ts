import {ScoreboardRow, ServerProxy} from "../../serverProxy";
import {autoinject, computedFrom, observable} from 'aurelia-framework';

@autoinject
export class Overview {
  @observable public selectedYear: number = new Date().getFullYear();

  private mScoreBoard: ScoreboardRow[] = [];

  constructor() {}

  public async activate(): Promise<void> {
    this.mScoreBoard = await ServerProxy.getScoreboard(this.selectedYear);
  }

  public async selectedYearChanged(): Promise<void> {
    this.mScoreBoard = await ServerProxy.getScoreboard(this.selectedYear);
  }

  @computedFrom("mScoreBoard")
  public get scoreboard(): ScoreboardRow[] {
    return this.mScoreBoard;
  }

  @computedFrom("mScoreBoard")
  public get showScoreboard(): boolean {
    return this.mScoreBoard.length > 0;
  }

  public get years(): number[] {
    const years = []

    for (let i = new Date().getFullYear(); i > 2021; i--) {
      years.push(i)
    }

    return years
  }
}
