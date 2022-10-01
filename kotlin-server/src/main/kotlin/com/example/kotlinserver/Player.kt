package com.example.kotlinserver

class Player (val id: Int, val name: String) {
    var rating = 1200
        private set
    var wins = 0
        private set
    var losses = 0
        private set

    fun increaseRating(change: Int) {
        rating += change
        wins++
    }

    fun reduceRating(change: Int) {
        rating -= change
        losses--
    }
}