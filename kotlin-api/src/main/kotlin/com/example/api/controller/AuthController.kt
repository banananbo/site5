package com.example.api.controller

import com.example.api.model.AuthCodeRequest
import com.example.api.model.LoginUrlResponse
import com.example.api.model.TokenResponse
import com.example.api.service.AuthService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.Cookie
import org.springframework.beans.factory.annotation.Value

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @Value("\${auth0.domain}")
    private lateinit var auth0Domain: String
    @Value("\${auth0.clientId}")
    private lateinit var auth0ClientId: String
    @Value("\${auth0.logoutRedirectUri}")
    private lateinit var logoutRedirectUri: String
    @Value("\${cookie.secure:true}")
    private var cookieSecure: Boolean = true

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
     * @param response レスポンスオブジェクト
     * @return レスポンスエンティティ
     */
    @PostMapping("/code")
    fun exchangeCode(@RequestBody request: AuthCodeRequest, response: HttpServletResponse): ResponseEntity<Map<String, String>> {
        val token = authService.exchangeCodeForToken(request.code)
        // id_tokenをCookieにセット
        val cookie = Cookie("id_token", token.idToken)
        cookie.isHttpOnly = true
        cookie.secure = cookieSecure
        cookie.path = "/"
        cookie.maxAge = 60 * 60 // 1時間（必要に応じて調整）
        response.addCookie(cookie)
        // 必要ならユーザー情報を返す。ここではOKのみ返す例
        return ResponseEntity.ok(mapOf("result" to "ok"))
    }

    /**
     * ログアウト用エンドポイント
     * Cookieのid_tokenを削除し、Auth0のログアウトURLを返す
     */
    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Map<String, String>> {
        val cookie = Cookie("id_token", null)
        cookie.isHttpOnly = true
        cookie.secure = cookieSecure
        cookie.path = "/"
        cookie.maxAge = 0 // 即時削除
        response.addCookie(cookie)
        // Auth0ログアウトURLを生成
        val auth0LogoutUrl = "https://$auth0Domain/v2/logout" +
            "?client_id=$auth0ClientId" +
            "&returnTo=$logoutRedirectUri"
        return ResponseEntity.ok(mapOf("logoutUrl" to auth0LogoutUrl))
    }
} 