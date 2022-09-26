package com.example.kotlinserver.database

import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel

interface DatabaseHandler {
    fun fetchPlayers(): List<PlayerModel>
    fun fetchMatches(): List<MatchModel>
    fun fetchPlayerFromId(player: Int): PlayerModel
    fun createPlayer(name: String)
    fun recordMatch(match: MatchModel)
}