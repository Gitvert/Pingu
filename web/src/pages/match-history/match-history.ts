import {Player, ServerProxy} from "../../serverProxy";
import {computedFrom} from "aurelia-framework";

interface MatchView {
  date: string;
  winner: string;
  winnerScore: number;
  loser: string
  loserScore: number;
}

export class MatchHistory {
  private static PAGE_SIZE = 15;

  private mPlayers: Player[]= [];
  private mMatches: MatchView[]= [];
  private mCurrentPage = 1;
  private mLastPage = 0;

  public async activate(): Promise<void> {
    this.mPlayers = await ServerProxy.getPlayers();
    this.mMatches = (await ServerProxy.getMatches())
      .map((match) => {
        return {
          date: match.date,
          winner: this.mPlayers.find((player) => player.id === match.winner).name,
          winnerScore: match.winnerScore,
          loser: this.mPlayers.find((player) => player.id === match.loser).name,
          loserScore: match.loserScore
        };
      });

    this.mLastPage = Math.ceil(this.mMatches.length / MatchHistory.PAGE_SIZE);
  }

  public onPreviousClicked(): void {
    this.mCurrentPage--;
  }

  public onNextClicked(): void {
    this.mCurrentPage++;
  }

  @computedFrom("mMatches", "mCurrentPage")
  public get matches(): MatchView[] {
    const startIndex = (this.mCurrentPage - 1) * MatchHistory.PAGE_SIZE;
    const endIndex = startIndex + MatchHistory.PAGE_SIZE;
    return this.mMatches.slice(startIndex, endIndex);
  }

  @computedFrom("mPlayers")
  public get players(): Player[] {
    return this.mPlayers;
  }

  public get showPreviousButton(): boolean {
    return this.mCurrentPage > 1;
  }

  @computedFrom("mCurrentPage")
  public get showNextButton(): boolean {
    return this.mCurrentPage != this.mLastPage;
  }

  @computedFrom("mMatches")
  public get showMatches(): boolean {
    return this.mMatches.length > 0;
  }

  @computedFrom("mMatches")
  public get showPaging(): boolean {
    return this.mMatches.length > MatchHistory.PAGE_SIZE;
  }
}
