package com.example.kotlinserver

import com.example.kotlinserver.database.SqliteHandler
import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import com.example.kotlinserver.models.ScoreboardModel
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
class Endpoints {

    @GetMapping("players")
    fun getPlayers(): List<PlayerModel> {
        return SqliteHandler().fetchPlayers()
    }

    @GetMapping("matches")
    fun getMatches(): List<MatchModel> {
        return listOf(
            MatchModel("2022-09-26", 1, 2, 11, 6),
            MatchModel("2022-09-26", 1, 3, 11, 6),
            MatchModel("2022-09-26", 2, 3, 11, 6),
        )
    }

    @GetMapping("scoreboard")
    fun getScoreboard(): List<ScoreboardModel> {
        return listOf(
            ScoreboardModel(1, "Player1", 1600, 2, 0),
            ScoreboardModel(1, "Player2", 1500, 1, 1),
            ScoreboardModel(1, "Player3", 1400, 0, 2),
        )
    }

    @PostMapping("player")
    fun postPlayer(@RequestBody player: PlayerRequest) {
        return
    }

    @PostMapping("match")
    fun postMatch(@RequestBody match: MatchRequest) {
        return
    }

}