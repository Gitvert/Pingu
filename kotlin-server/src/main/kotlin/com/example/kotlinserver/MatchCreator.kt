package com.example.kotlinserver

import com.example.kotlinserver.database.DatabaseHandlerFactory
import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.requests.MatchRequest
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.web.client.RestTemplate
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class MatchCreator {
    companion object {
        fun createMatch(match: MatchRequest) {
            validate(match)

            val ratingChange = calculateRatingChange(match)

            recordMatch(match)

            printMatchResult(match, ratingChange)
        }

        private fun validate(match: MatchRequest) {
            if (!MatchResultValidator.validate(match)) {
                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
            }
        }

        private fun calculateRatingChange(match: MatchRequest): Int {
            val players = EloCalculator.getPlayersWithElo()
            return EloCalculator.updateEloRating(players[match.winner]!!, players[match.loser]!!)
        }

        private fun recordMatch(match: MatchRequest) {
            DatabaseHandlerFactory.getDatabaseHandler().recordMatch(MatchModel(
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYY-MM-dd hh:mm:ss")),
                match.winner,
                match.loser,
                match.winnerScore,
                match.loserScore
            ))
        }

        private fun printMatchResult(match: MatchRequest, ratingChange: Int) {
            val databaseHandler = DatabaseHandlerFactory.getDatabaseHandler()
            val winner = databaseHandler.fetchPlayerFromId(match.winner)
            val loser = databaseHandler.fetchPlayerFromId(match.loser)

            val ratingChangeText = "(Rating change: $ratingChange)"
            val scoreText = " with ${match.winnerScore} - ${match.loserScore}"
            val matchResultText = "${winner.name} won over ${loser.name}$scoreText $ratingChangeText"

            if (Configuration.environment == Environment.PRODUCTION) {
                postToSlack(matchResultText)
            } else {
                println(matchResultText)
            }
        }

        private fun postToSlack(message: String) {
            val headers = HttpHeaders()
            headers.add("content-type", "application/json")
            headers.add("Authorization", "Bearer ${Configuration.slackBearerToken}")

            val body = mapOf("text" to message, "channel" to Configuration.slackChannelId)
            val httpEntity = HttpEntity(body, headers)

            RestTemplate().exchange("https://slack.com/api/chat.postMessage", HttpMethod.POST, httpEntity, Void.TYPE)
        }
    }
}