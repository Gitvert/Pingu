import {Player} from "./player";

export class Elo {

    private static k: number = 30;

    private static calculateProbability(rating1: number, rating2: number): number {
        return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
    }

    public static updateEloRating(winner: Player, loser: Player) {
        const probability: number = this.calculateProbability(loser.rating, winner.rating);

        const ratingChange = Math.round(this.k * (1 - probability));

        winner.increaseRating(ratingChange);
        loser.reduceRating(ratingChange);
    }
}
