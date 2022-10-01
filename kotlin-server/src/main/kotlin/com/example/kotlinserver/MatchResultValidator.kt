package com.example.kotlinserver

import com.example.kotlinserver.requests.MatchRequest

class MatchResultValidator {

    companion object {
        fun validate(match: MatchRequest): Boolean {
            if (match.winner == match.loser) {
                return false
            }

            if (match.winnerScore < 11) {
                return false
            } else if (match.winnerScore <= match.loserScore) {
                return false
            } else if (match.winnerScore - match.loserScore < 2) {
                return false
            } else if (match.winnerScore > 11 && match.winnerScore - match.loserScore != 2) {
                return false
            }

            return true
        }
    }
}