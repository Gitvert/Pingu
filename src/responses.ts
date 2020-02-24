export class PlayerResponse {
    constructor(
        public id: number,
        public name: string
    ) {}
}

export class MatchResponse {
    constructor(
        public date: string,
        public winner: number,
        public loser: number,
        public winnerScore: number,
        public loserScore: number
    ) {}
}

export class ScoreboardResponse {
    constructor(
        public id: number,
        public name: string,
        public rating: number,
        public wins: number,
        public losses: number
    ) {}
}