package com.example.api.model

/**
 * トークンレスポンス
 */
data class TokenResponse(
    val accessToken: String,
    val idToken: String,
    val tokenType: String = "Bearer",
    val expiresIn: Long
) 