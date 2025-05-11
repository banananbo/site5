package com.example.api.model

/**
 * Auth0からのコールバックで受け取る認証コード用リクエスト
 */
data class AuthCodeRequest(
    val code: String,
    val state: String? = null
) 