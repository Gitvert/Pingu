export class Match {

    constructor(
        private mDate: string,
        private mWinner: number,
        private mLoser: number,
        private mWinnerScore: number,
        private mLoserScore: number
    ) {}

    public get date(): string {
        return this.mDate;
    }

    get winner(): number {
        return this.mWinner;
    }

    get loser(): number {
        return this.mLoser;
    }

    get winnerScore(): number {
        return this.mWinnerScore;
    }

    get loserScore(): number {
        return this.mLoserScore;
    }
}