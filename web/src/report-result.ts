import {Player, ServerProxy} from "./serverProxy";
import {autoinject, computedFrom} from "aurelia-framework";
import {Router} from "aurelia-router";

@autoinject
export class ReportResult {

  public selectedPlayer1Id: number;
  public selectedPlayer2Id: number;
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

  @computedFrom("mPlayers")
  public get players(): Player[] {
    return this.mPlayers;
  }
}
