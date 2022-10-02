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

        println(response.items())

        return emptyList()
    }

    override fun fetchMatches(): List<MatchModel> {
        val request = ScanRequest.builder().tableName("PinguMatches").build()
        val response = dynamoDbClient.scan(request)

        println(response.items())

        return emptyList()
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