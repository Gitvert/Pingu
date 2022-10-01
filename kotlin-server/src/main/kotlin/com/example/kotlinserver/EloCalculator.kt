package com.example.kotlinserver

import com.example.kotlinserver.database.DatabaseHandler
import com.example.kotlinserver.database.DatabaseHandlerFactory
import kotlin.math.pow
import kotlin.math.roundToInt

class EloCalculator {
    companion object {
        private const val k = 30

        fun getPlayersWithElo(): Map<Int, Player> {
            val databaseHandler: DatabaseHandler = DatabaseHandlerFactory.getDatabaseHandler()

            val players = databaseHandler.fetchPlayers().associate { it.id to Player(it.id, it.name) }
            val matches = databaseHandler.fetchMatches().reversed()

            matches.forEach { updateEloRating(players[it.winner]!!, players[it.loser]!!) }

            return players
        }

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