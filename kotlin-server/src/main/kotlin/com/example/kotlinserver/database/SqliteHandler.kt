package com.example.kotlinserver.database

import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import java.sql.*

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
        val resultSet: ResultSet = statement.executeQuery("select date, winner, loser, winner_score, loser_score from matches order by date desc")
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

    override fun fetchPlayerFromId(playerId: Int): PlayerModel {
        val connection = connect()
        val statement: Statement = connection.createStatement()
        val resultSet: ResultSet = statement.executeQuery("select id, name from players where id = $playerId")

        resultSet.next()
        val player = PlayerModel(resultSet.getInt("id"), resultSet.getString("name"))

        connection.close()

        return player
    }

    override fun createPlayer(name: String) {
        val connection = connect()
        val statement: PreparedStatement = connection.prepareStatement("insert into players (name) values (?)")
        statement.setString(1, name)

        statement.executeUpdate()
        connection.close()
    }

    override fun recordMatch(match: MatchModel) {
        val connection = connect()
        val statement: PreparedStatement = connection.prepareStatement(
            "insert into matches (date, winner, loser, winner_score, loser_score) values (?, ?, ?, ?, ?)"
        )

        statement.setString(1, match.date)
        statement.setInt(2, match.winner)
        statement.setInt(3, match.loser)
        statement.setInt(4, match.winnerScore)
        statement.setInt(5, match.loserScore)

        statement.executeUpdate()
        connection.close()
    }

    private fun connect(): Connection {
        return DriverManager.getConnection("jdbc:sqlite:./database.db")
    }
}