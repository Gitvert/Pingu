package com.example.kotlinserver

import com.example.kotlinserver.requests.MatchRequest

class MatchResultValidator {

    companion object {
        fun validate(match: MatchRequest): Boolean {
            return validateInput(match) && validateScore(match)
        }

        private fun validateInput(match: MatchRequest): Boolean {
            return match.winner >= 0 && match.loser >= 0 && match.winner != match.loser
        }

        private fun validateScore(match: MatchRequest): Boolean {
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