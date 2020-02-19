export class Match {

    constructor(
        private mDate: string,
        private mWinner: number,
        private mLoser: number
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
}