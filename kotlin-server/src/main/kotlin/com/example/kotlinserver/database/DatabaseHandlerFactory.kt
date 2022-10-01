package com.example.kotlinserver.database

import com.example.kotlinserver.Configuration
import com.example.kotlinserver.Environment

class DatabaseHandlerFactory {
    companion object {
        fun getDatabaseHandler(): DatabaseHandler {
            return if (Configuration.environment == Environment.LOCAL) {
                SqliteHandler()
            } else {
                DynamoDbHandler()
            }
        }
    }
}