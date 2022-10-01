package com.example.kotlinserver.database

import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.Statement

class SqliteHandler : DatabaseHandler {
    override fun fetchPlayers(): List<PlayerModel> {
        val connection = connect()
        val statement: Statement = connection.createStatement()
        val resultSet: ResultSet = statement.executeQuery("select id, name from players")
        val players: MutableList<PlayerModel> = mutableListOf()

        while (resultSet.next()) {
            players.add(PlayerModel(resultSet.getInt("id"), resultSet.getString("name")))
        }

        connection.close()

        return players
    }

    override fun fetchMatches(): List<MatchModel> {
        val connection = connect()
        val statement: Statement = connection.createStatement()
        val resultSet: ResultSet = statement.executeQuery("select date, winner, loser, winner_score, loser_score from matches")
        val matches: MutableList<MatchModel> = mutableListOf()

        while (resultSet.next()) {
            matches.add(MatchModel(
                resultSet.getString("date"),
                resultSet.getInt("winner"),
                resultSet.getInt("loser"),
                resultSet.getInt("winner_score"),
                resultSet.getInt("loser_score"),
            ))
        }

        connection.close()

        return matches
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

    private fun connect(): Connection {
        return DriverManager.getConnection("jdbc:sqlite:./database.db")
    }
}