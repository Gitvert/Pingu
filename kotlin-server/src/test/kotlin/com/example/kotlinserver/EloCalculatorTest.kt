package com.example.kotlinserver

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class EloCalculatorTest {
    @Test
    fun players_with_same_rating_should_should_have_correct_elo_update() {
        val player1 = Player(1, "Player1")
        val player2 = Player(2, "Player2")

        EloCalculator.updateEloRating(player1, player2)

        assertEquals(1215, player1.rating)
        assertEquals(1185, player2.rating)
    }

    @Test
    fun players_with_different_rating_should_have_correct_elo_update() {
        val player1 = Player(1, "Player1")
        val player2 = Player(2, "Player2")

        EloCalculator.updateEloRating(player1, player2)
        EloCalculator.updateEloRating(player1, player2)
        EloCalculator.updateEloRating(player1, player2)

        assertEquals(1242, player1.rating)
        assertEquals(1158, player2.rating)
    }
}
