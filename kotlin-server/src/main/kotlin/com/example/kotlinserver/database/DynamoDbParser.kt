package com.example.kotlinserver.database

class DynamoDbParser {
    companion object {
        fun parseNumberAttribute(value: String): Int {
            return Integer.valueOf(value.substringAfter("AttributeValue(N=").substringBeforeLast(")"))
        }

        fun parseStringAttribute(value: String): String {
            return value.substringAfter("AttributeValue(S=").substringBeforeLast(")")
        }
    }
}