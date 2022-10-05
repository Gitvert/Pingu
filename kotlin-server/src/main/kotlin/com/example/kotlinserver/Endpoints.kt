package com.example.kotlinserver

import com.example.kotlinserver.database.DatabaseHandler
import com.example.kotlinserver.database.DatabaseHandlerFactory
import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import com.example.kotlinserver.requests.MatchRequest
import com.example.kotlinserver.requests.PlayerRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@CrossOrigin
@RestController
class Endpoints {
    private val databaseHandler: DatabaseHandler = DatabaseHandlerFactory.getDatabaseHandler()

    @GetMapping("players")
    fun getPlayers(): List<PlayerModel> {
        return databaseHandler.fetchPlayers()
    }

    @GetMapping("matches")
    fun getMatches(): List<MatchModel> {
        return databaseHandler.fetchMatches()
    }

    @GetMapping("scoreboard")
    fun getScoreboard(): List<Player> {
        return EloCalculator.getPlayersWithElo().values.sortedByDescending { it.rating }
    }

    @PostMapping("player")
    fun postPlayer(@RequestBody player: PlayerRequest) {
        databaseHandler.createPlayer(player.name)
     }

    @PostMapping("match")
    fun postMatch(@RequestBody match: MatchRequest) {
        MatchCreator.createMatch(match)
    }

    @PostMapping("matches")
    fun postMatches(@RequestBody matches: List<MatchRequest>) {
        matches.forEach {
            MatchCreator.createMatch(it)
            Thread.sleep(1000) //This delay is needed to retain the correct order of matches
        }
    }
}