package com.example.kotlinserver.database

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class DynamoDbParserTest {
    @Test
    fun numbers_should_be_parsed_correctly() {
        assertEquals(1, DynamoDbParser.parseNumberAttribute("AttributeValue(N=1)"))
    }

    @Test
    fun strings_should_be_parsed_correctly() {
        assertEquals("Player 1", DynamoDbParser.parseStringAttribute("=AttributeValue(S=Player 1)"))
    }
}