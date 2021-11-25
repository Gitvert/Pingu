import {Player, ServerProxy} from "../../serverProxy";
import {autoinject, computedFrom, observable} from "aurelia-framework";
import {Router} from "aurelia-router";

@autoinject
export class ReportResult {

  @observable public selectedPlayer1Id: number;
  @observable public selectedPlayer2Id: number;
  public player1Score: string;
  public player2Score: string;

  private mPlayers: Player[]= [];

  constructor(private mRouter: Router) {}

  public async activate(): Promise<void> {
    this.mPlayers = await ServerProxy.getPlayers();
  }

  public async submitClicked(): Promise<void> {
    await ServerProxy.postMatch(this.selectedPlayer1Id, this.selectedPlayer2Id, parseInt(this.player1Score, 10), parseInt(this.player2Score, 10))
      .then(() => this.mRouter.navigate(""))
      .catch(() => alert("INVALID SCORE"));
  }

  public selectedPlayer1IdChanged(newValue: number): void {
    if (newValue == -1) {
      this.createPlayer();
    }
  }

  public selectedPlayer2IdChanged(newValue: number): void {
    if (newValue == -1) {
      this.createPlayer();
    }
  }

  @computedFrom("mPlayers")
  public get players(): Player[] {
    return this.mPlayers;
  }

  private createPlayer(): void {
    this.mRouter.navigate("/create-player");
  }
}
