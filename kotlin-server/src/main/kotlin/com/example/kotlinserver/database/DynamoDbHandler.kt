package com.example.kotlinserver.database

import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel

class DynamoDbHandler : DatabaseHandler {
    override fun fetchPlayers(): List<PlayerModel> {
        TODO("Not yet implemented")
    }

    override fun fetchMatches(): List<MatchModel> {
        TODO("Not yet implemented")
    }

    override fun fetchPlayerFromId(player: Int): PlayerModel {
        TODO("Not yet implemented")
    }

    override fun createPlayer(name: String) {
        TODO("Not yet implemented")
    }

    override fun recordMatch(match: MatchModel) {
        TODO("Not yet implemented")
    }
}