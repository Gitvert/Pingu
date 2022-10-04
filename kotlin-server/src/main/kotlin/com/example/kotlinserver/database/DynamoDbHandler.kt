package com.example.kotlinserver.database

import com.example.kotlinserver.Configuration
import com.example.kotlinserver.models.MatchModel
import com.example.kotlinserver.models.PlayerModel
import software.amazon.awssdk.auth.credentials.InstanceProfileCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.dynamodb.DynamoDbClient
import software.amazon.awssdk.services.dynamodb.model.ScanRequest

class DynamoDbHandler : DatabaseHandler {

    private val dynamoDbClient: DynamoDbClient

    init {
        val provider = InstanceProfileCredentialsProvider.create()
        dynamoDbClient = DynamoDbClient.builder().region(Region.of(Configuration.awsRegion)).credentialsProvider(provider).build()
    }
    override fun fetchPlayers(): List<PlayerModel> {

        val request = ScanRequest.builder().tableName("PinguPlayers").build()
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
        val request = ScanRequest.builder().tableName("PinguMatches").build()
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
        TODO("Not yet implemented")
    }

    override fun createPlayer(name: String) {
        TODO("Not yet implemented")
    }

    override fun recordMatch(match: MatchModel) {
        TODO("Not yet implemented")
    }
}