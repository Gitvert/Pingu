package com.example.kotlinserver.database

import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import java.time.LocalDate

interface DatabaseHandler {
    fun fetchPlayers(): List<PlayerModel>
    fun fetchMatches(from: LocalDate, to: LocalDate): List<MatchModel>
    fun fetchPlayerFromId(playerId: Int): PlayerModel
    fun createPlayer(name: String)
    fun recordMatch(match: MatchModel)
}