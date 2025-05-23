package com.example.api.controller

import com.example.api.model.AuthCodeRequest
import com.example.api.model.LoginUrlResponse
import com.example.api.model.TokenResponse
import com.example.api.service.AuthService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    /**
     * Auth0ログインURLを生成するエンドポイント
     * @return Auth0の認証ページへのURL
     */
    @GetMapping("/login_url")
    fun login(): LoginUrlResponse {
        val authorizationUrl = authService.createAuthorizationUrl()
        return LoginUrlResponse(authorizationUrl)
    }
    
    /**
     * Auth0からの認証コードをトークンに交換するエンドポイント
     * @param request 認証コードリクエスト
     * @return トークンレスポンス
     */
    @PostMapping("/code")
    fun exchangeCode(@RequestBody request: AuthCodeRequest): TokenResponse {
        return authService.exchangeCodeForToken(request.code)
    }
} 