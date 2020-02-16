export class Player {

    constructor(
        private mName: string,
        private mRating: number,
    ) {}

    public get name(): string {
        return this.mName;
    }

    public get rating(): number {
        return this.mRating;
    }

    public increaseRating(change: number): void {
        this.mRating += change;
    }

    public reduceRating(change: number): void {
        this.mRating -= change;
    }
}