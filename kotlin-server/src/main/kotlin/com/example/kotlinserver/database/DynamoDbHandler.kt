package com.example.kotlinserver.database

import com.example.kotlinserver.Configuration
import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import software.amazon.awssdk.auth.credentials.InstanceProfileCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import software.amazon.awssdk.services.dynamodb.model.AttributeValue
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest
import software.amazon.awssdk.services.dynamodb.model.ScanRequest

private const val PLAYERS_TABLE_NAME = "PinguPlayers"
private const val MATCH_TABLE_NAME = "PinguMatches"

class DynamoDbHandler : DatabaseHandler {

    private val dynamoDbClient: DynamoDbClient
    private var highestPlayerIndex = -1

    init {
        val provider = InstanceProfileCredentialsProvider.create()
        dynamoDbClient = DynamoDbClient.builder().region(Region.of(Configuration.awsRegion)).credentialsProvider(provider).build()

        fetchPlayers().forEach {
            if (it.id > highestPlayerIndex) {
                highestPlayerIndex = it.id
            }
        }
    }

    override fun fetchPlayers(): List<PlayerModel> {

        val request = ScanRequest.builder().tableName(PLAYERS_TABLE_NAME).build()
        val response = dynamoDbClient.scan(request)

        val players: MutableList<PlayerModel> = mutableListOf()

        response.items().toList().forEach { entries ->
            players.add(PlayerModel(
                DynamoDbParser.parseNumberAttribute(entries["id"].toString()),
                DynamoDbParser.parseStringAttribute(entries["name"].toString())
            ))
        }

        return players
    }

    override fun fetchMatches(): List<MatchModel> {
        val request = ScanRequest.builder().tableName(MATCH_TABLE_NAME).build()
        val response = dynamoDbClient.scan(request)

        val matches: MutableList<MatchModel> = mutableListOf()

        response.items().toList().forEach { entries ->
            matches.add(MatchModel(
                DynamoDbParser.parseStringAttribute(entries["date"].toString()),
                DynamoDbParser.parseNumberAttribute(entries["winner"].toString()),
                DynamoDbParser.parseNumberAttribute(entries["loser"].toString()),
                DynamoDbParser.parseNumberAttribute(entries["winner_score"].toString()),
                DynamoDbParser.parseNumberAttribute(entries["loser_score"].toString()),
            ))
        }

        return matches
    }

    override fun fetchPlayerFromId(playerId: Int): PlayerModel {
        return fetchPlayers().first { it.id == playerId }
    }

    override fun createPlayer(name: String) {
        highestPlayerIndex++
        val attributes = mapOf<String, AttributeValue>(
            Pair("id", AttributeValue.fromN(highestPlayerIndex.toString())),
            Pair("name", AttributeValue.fromS(name)),
        )

        val request = PutItemRequest.builder().tableName(PLAYERS_TABLE_NAME).item(attributes).build()
        dynamoDbClient.putItem(request)
    }

    override fun recordMatch(match: MatchModel) {
        val attributes = mapOf<String, AttributeValue>(
            Pair("date", AttributeValue.fromS(match.date)),
            Pair("winner", AttributeValue.fromN(match.winner.toString())),
            Pair("loser", AttributeValue.fromN(match.loser.toString())),
            Pair("winner_score", AttributeValue.fromN(match.winnerScore.toString())),
            Pair("loser_score", AttributeValue.fromN(match.loserScore.toString())),
        )

        val request = PutItemRequest.builder().tableName(MATCH_TABLE_NAME).item(attributes).build()
        dynamoDbClient.putItem(request)
    }
}