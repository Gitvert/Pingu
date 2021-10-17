import {ScoreboardRow, ServerProxy} from "./serverProxy";
import {autoinject, computedFrom} from 'aurelia-framework';
import {Router} from "aurelia-router";

enum State {
  Default = 0,
  RecordGame = 1
}

@autoinject
export class Overview {
  private mScoreBoard: ScoreboardRow[] = [];
  public state: State = State.Default;

  constructor(private mRouter: Router) {}

  public async activate(): Promise<void> {
    this.mScoreBoard = await ServerProxy.getScoreboard();
  }

  public async reportResultClicked(): Promise<void> {
    console.log(await ServerProxy.getMatches());
    console.log(await ServerProxy.getPlayers());
    console.log(await ServerProxy.getScoreboard());
    this.state = State.RecordGame;
    this.mRouter.navigate("/report-result");
  }

  public get showScoreboard(): boolean {
    return this.state === State.Default;
  }

  @computedFrom("mScoreBoard")
  public get scoreboard(): ScoreboardRow[] {
    return this.mScoreBoard;
  }
}
