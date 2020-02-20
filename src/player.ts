export class Player {

    private mRating: number = 1200;
    private mWins: number = 0;
    private mLosses: number = 0;

    constructor(
        private mId: number,
        private mName: string
    ) {}

    public get id(): number {
        return this.mId;
    }

    public get name(): string {
        return this.mName;
    }

    public get rating(): number {
        return this.mRating;
    }

    public get wins(): number {
        return this.mWins;
    }

    public get losses(): number {
        return this.mLosses;
    }

    public increaseRating(change: number): void {
        this.mRating += change;
    }

    public reduceRating(change: number): void {
        this.mRating -= change;
    }


}