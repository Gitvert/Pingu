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

  public reportResultClicked(): void {
    console.log("OKLASOK");
  }

  public get showScoreboard(): boolean {
    return this.state === State.Default;
  }
}
