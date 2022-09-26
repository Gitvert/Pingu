package com.example.kotlinserver.models

data class MatchModel(val date: String, val winner: Int, val loser: Int, val winnerScore: Int, val loserScore: Int) : Model
