import {ScoreboardRow, ServerProxy} from "./serverProxy";
import {computedFrom} from 'aurelia-framework';

enum State {
  Default = 0,
  RecordGame = 1
}

export class Overview {
  private mScoreBoard: ScoreboardRow[] = [];

  public state: State = State.Default;

  public async activate(): Promise<void> {
    this.mScoreBoard = await ServerProxy.getScoreboard();
  }

  public async reportResultClicked(): Promise<void> {
    console.log(await ServerProxy.getMatches());
    console.log(await ServerProxy.getPlayers());
    console.log(await ServerProxy.getScoreboard());
    this.state = State.RecordGame;
  }

  public get showScoreboard(): boolean {
    return this.state === State.Default;
  }

  @computedFrom("mScoreBoard")
  public get scoreboard(): ScoreboardRow[] {
    return this.mScoreBoard;
  }
}
