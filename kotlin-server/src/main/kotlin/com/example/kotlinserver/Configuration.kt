package com.example.kotlinserver

object Configuration {
    private var environment: Environment

    init {
        val env: String? = System.getenv("pingu-environment")
        environment = if (env == "local") {
            Environment.LOCAL
        } else {
            Environment.PRODUCTION
        }
    }

    fun getEnvironment(): Environment {
        return environment
    }
}