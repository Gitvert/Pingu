package com.example.kotlinserver

import kotlin.math.pow
import kotlin.math.roundToInt

class EloCalculator {
    companion object {
        private const val k = 30

        fun updateEloRating(winner: Player, loser: Player): Int {
            val probability = calculateProbability(loser.rating, winner.rating)

            val ratingChange = (k * (1 - probability)).roundToInt()

            winner.increaseRating(ratingChange)
            loser.reduceRating(ratingChange)

            return ratingChange
        }

        private fun calculateProbability(rating1: Int, rating2: Int): Double {
            return 1 / (1 + 1 * (10.0.pow(1.0 * (rating1 - rating2) / 400)))
        }
    }
}