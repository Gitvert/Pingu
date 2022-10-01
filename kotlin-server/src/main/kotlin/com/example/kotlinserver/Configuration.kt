package com.example.kotlinserver

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import java.io.File

object Configuration {
    val environment: Environment
    val slackBearerToken: String
    val slackChannelId: String
    val awsRegion: String

    init {
        val env: String? = System.getenv("pingu-environment")
        environment = if (env == "local") {
            Environment.LOCAL
        } else {
            Environment.PRODUCTION
        }

        val configFile = readConfigFile()
        slackBearerToken = configFile.slackBearerToken
        slackChannelId = configFile.slackChannelId
        awsRegion = configFile.awsRegion
    }

    fun readConfigFile(): ConfigFile {
        val lines: MutableList<String> = mutableListOf()

        File("./pingu-config.json").useLines { line -> line.forEach { lines.add(it) } }

        return jacksonObjectMapper().readValue(lines.joinToString("\n"), ConfigFile::class.java)
    }
}