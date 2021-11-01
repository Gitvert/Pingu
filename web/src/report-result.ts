import {Player, ServerProxy} from "./serverProxy";
import {computedFrom} from "aurelia-framework";

export class ReportResult {

  public selectedPlayer1Id: number;
  public selectedPlayer2Id: number;
  public player1Score: string;
  public player2Score: string;

  private mPlayers: Player[]= [];

  public async activate(): Promise<void> {
    this.mPlayers = await ServerProxy.getPlayers();
  }

  public async submitClicked(): Promise<void> {
    await ServerProxy.postMatch(
      this.selectedPlayer1Id,
      this.selectedPlayer2Id,
      parseInt(this.player1Score, 10),
      parseInt(this.player2Score, 10),
    );
  }

  @computedFrom("mPlayers")
  public get players(): Player[] {
    return this.mPlayers;
  }
}
