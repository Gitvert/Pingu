package com.example.kotlinserver.requests

data class MatchRequest(val winner: Int, val loser: Int, val winnerScore: Int, val loserScore: Int)
