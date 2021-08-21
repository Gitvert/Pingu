export interface PlayerRecord {
    id: number;
    name: string;
}

export interface MatchRecord {
    date: string,
    winner: number,
    loser: number,
    winner_score: number,
    loser_score: number
}