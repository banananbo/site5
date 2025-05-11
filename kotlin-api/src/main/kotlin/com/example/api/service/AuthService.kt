package com.example.api.service

import com.auth0.client.auth.AuthAPI
import com.auth0.json.auth.TokenHolder
import com.example.api.model.TokenResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class AuthService(private val authAPI: AuthAPI) {
    
    @Value("\${auth0.domain}")
    private lateinit var domain: String
    
    @Value("\${auth0.redirectUri}")
    private lateinit var redirectUri: String
    
    @Value("\${auth0.audience}")
    private lateinit var audience: String
    
    /**
     * Auth0のログインURLを生成します
     */
    fun createAuthorizationUrl(): String {
        // ステート値を生成（CSRF対策）
        val state = UUID.randomUUID().toString()
        
        // Auth0ログインURLを生成
        return authAPI.authorizeUrl(redirectUri)
            .withAudience(audience)
            .withScope("openid profile email")
            .withState(state)
            .build()
    }
    
    /**
     * 認証コードをトークンに交換します
     */
    fun exchangeCodeForToken(code: String): TokenResponse {
        // Auth0に認証コードを送信してトークンを取得
        val holder: TokenHolder = authAPI.exchangeCode(code, redirectUri).execute()
        
        // トークンレスポンスを生成
        return TokenResponse(
            accessToken = holder.accessToken,
            expiresIn = holder.expiresIn
        )
    }
} 