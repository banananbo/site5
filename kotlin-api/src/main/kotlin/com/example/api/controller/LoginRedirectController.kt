package com.example.api.controller

import com.example.api.service.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.view.RedirectView

@RestController
@RequestMapping("/api")
class LoginRedirectController(private val authService: AuthService) {

    /**
     * ログインページリダイレクト用エンドポイント
     * ドキュメントに記載されているapi.lvh,.me/api/loginエンドポイント用
     * @return Auth0の認証ページへリダイレクト
     */
    @GetMapping("/login")
    fun loginRedirect(): ResponseEntity<Any> {
        val authorizationUrl = authService.createAuthorizationUrl()
        return ResponseEntity.status(HttpStatus.FOUND)
            .header("Location", authorizationUrl)
            .build()
    }
} 