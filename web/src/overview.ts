import {ScoreboardRow, ServerProxy} from "./serverProxy";
import {computedFrom} from 'aurelia-framework';

interface Player {
  name: string;
  wins: number;
  losses: number;
  elo: number;
}

enum State {
  Default = 0,
  RecordGame = 1
}

export class Overview {
  private mScoreBoard: ScoreboardRow[] = [];

  public players: Player[] = [
    {name: "Evertsson", wins: 12, losses: 1, elo: 1500},
    {name: "Jesper Evertsson", wins: 12, losses: 1, elo: 3456},
    {name: "Evertsson", wins: 12, losses: 1, elo: 1500},
    {name: "Sven Evertsson", wins: 12, losses: 1, elo: 655},
    {name: "Evertsson", wins: 12, losses: 1, elo: 1500},
    {name: "Evertsson", wins: 12, losses: 1, elo: 1500},
    {name: "Anders Evertsson", wins: 12, losses: 1, elo: 5678},
    {name: "Evertsson", wins: 12, losses: 1, elo: 1500},
  ]

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
