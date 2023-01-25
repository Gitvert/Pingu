package com.example.kotlinserver

import com.example.kotlinserver.database.DatabaseHandler
import com.example.kotlinserver.database.DatabaseHandlerFactory
import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import com.example.kotlinserver.requests.MatchRequest
import com.example.kotlinserver.requests.PlayerRequest
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.temporal.TemporalAdjusters

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
        return databaseHandler.fetchMatches(
            LocalDate.now().minusYears(100), 
            LocalDate.now().with(TemporalAdjusters.lastDayOfYear())
        )
    }

    @GetMapping("scoreboard")
    fun getScoreboard(@RequestParam(name = "year") yearString: String): List<Player> {
        val year = LocalDate.of(yearString.toInt(), 1, 1)
        
        return EloCalculator.getPlayersWithElo(year).values.sortedByDescending { it.rating }.filter { it.wins + it.losses > 0 }
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