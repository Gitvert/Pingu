package com.example.kotlinserver.database

class DatabaseHandlerFactory {
    companion object {
        fun getDatabaseHandler(): DatabaseHandler {
            val env: String? = System.getenv("pingu-environment")
            return if (env == "local") {
                SqliteHandler()
            } else {
                DynamoDbHandler()
            }
        }
    }
}