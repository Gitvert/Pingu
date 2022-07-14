import {Player, ServerProxy} from "../../serverProxy";
import {computedFrom, observable} from "aurelia-framework";

interface MatchView {
  date: string;
  winner: string;
  winnerScore: number;
  loser: string
  loserScore: number;
}

export class MatchHistory {
  private static PAGE_SIZE = 15;

  @observable public selectedPlayer: string;

  private mPlayers: Player[]= [];
  private mMatches: MatchView[] = [];
  private mSelectedMatches: MatchView[] = [];
  private mCurrentPage = 1;
  private mLastPage = 1;

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

    this.updateMatchList();
  }

  public onPreviousClicked(): void {
    this.mCurrentPage--;
  }

  public onNextClicked(): void {
    this.mCurrentPage++;
  }

  public selectedPlayerChanged(): void {
    this.mCurrentPage = 1;
    this.updateMatchList();
  }

  @computedFrom("mSelectedMatches", "mCurrentPage")
  public get matches(): MatchView[] {
    const startIndex = (this.mCurrentPage - 1) * MatchHistory.PAGE_SIZE;
    const endIndex = startIndex + MatchHistory.PAGE_SIZE;

    return this.mSelectedMatches.slice(startIndex, endIndex);
  }

  @computedFrom("mCurrentPage")
  public get showPreviousButton(): boolean {
    return this.mCurrentPage > 1;
  }

  @computedFrom("mCurrentPage", "mLastPage")
  public get showNextButton(): boolean {
    return this.mCurrentPage != this.mLastPage;
  }

  @computedFrom("mSelectedMatches")
  public get showMatches(): boolean {
    return this.mSelectedMatches.length > 0;
  }

  @computedFrom("mSelectedMatches")
  public get showPaging(): boolean {
    return this.mSelectedMatches.length > MatchHistory.PAGE_SIZE;
  }

  @computedFrom("mPlayers")
  public get players(): Player[] {
    return this.mPlayers.sort((a, b) => a.name < b.name ? -1 : 1);
  }

  private updateMatchList() {
    this.mSelectedMatches = this.mMatches.filter((match) => this.checkFilter(match));
    this.mLastPage = Math.ceil(this.mSelectedMatches.length / MatchHistory.PAGE_SIZE);
  }

  private checkFilter(match: MatchView): boolean {
    if (match.winner.localeCompare(this.selectedPlayer) === 0) {
      return true;
    }

    if (match.loser.localeCompare(this.selectedPlayer) === 0) {
      return true;
    }

    return this.selectedPlayer == undefined;
  }
}
