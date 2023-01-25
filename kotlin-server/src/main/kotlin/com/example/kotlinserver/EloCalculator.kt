package com.example.kotlinserver

import com.example.kotlinserver.database.DatabaseHandler
import com.example.kotlinserver.database.DatabaseHandlerFactory
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.temporal.TemporalAdjusters.firstDayOfYear
import java.time.temporal.TemporalAdjusters.lastDayOfYear
import kotlin.math.pow
import kotlin.math.roundToInt

class EloCalculator {
    companion object {
        private const val k = 30

        fun getPlayersWithElo(year: LocalDate): Map<Int, Player> {
            val databaseHandler: DatabaseHandler = DatabaseHandlerFactory.getDatabaseHandler()

            val players = databaseHandler.fetchPlayers().associate { it.id to Player(it.id, it.name) }
            val matches = databaseHandler.fetchMatches(
                year.with(firstDayOfYear()), 
                year.with(lastDayOfYear())
            ).reversed()

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
            return 1.0 / (1.0 + (10.0.pow((rating1 - rating2) / 400.0)))
        }
    }
}