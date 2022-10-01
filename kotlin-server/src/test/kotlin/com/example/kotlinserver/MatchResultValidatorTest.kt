package com.example.kotlinserver

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class MatchResultValidatorTest {

    @Test
    fun winner_score_lower_than_11_should_not_be_valid() {
        assertFalse(MatchResultValidator.validate(MatchRequest(1, 2, 5, 0)))
    }

    @Test
    fun winner_score_lower_than_loser_score_should_not_be_valid() {
        assertFalse(MatchResultValidator.validate(MatchRequest(1, 2, 11, 13)))
    }

    @Test
    fun winner_score_one_higher_than_loser_score_should_not_be_valid() {
        assertFalse(MatchResultValidator.validate(MatchRequest(1, 2, 11, 10)))
    }

    @Test
    fun winner_score_fifteen_and_loser_score_ten_should_not_be_valid() {
        assertFalse(MatchResultValidator.validate(MatchRequest(1, 2, 15, 10)))
    }

    @Test
    fun valid_winner_score_should_be_valid() {
        assertTrue(MatchResultValidator.validate(MatchRequest(1, 2, 11, 9)))
        assertTrue(MatchResultValidator.validate(MatchRequest(1, 2, 11, 5)))
    }

    @Test
    fun winner_same_as_loser_should_not_be_valid() {
        assertFalse(MatchResultValidator.validate(MatchRequest(1, 1, 11, 9)))
    }
}