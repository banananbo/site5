package com.example.api.controller

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.util.Date
import org.springframework.test.context.TestPropertySource

@WebMvcTest(ApiController::class)
@TestPropertySource(locations = ["classpath:application-test.properties"])
class ApiControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    // 有効なid_tokenを生成
    private fun createValidIdToken(): String {
        val algorithm = Algorithm.HMAC256("secret")
        return JWT.create()
            .withSubject("auth0|testuser")
            .withClaim("name", "テストユーザー")
            .withClaim("email", "test@example.com")
            .withExpiresAt(Date(System.currentTimeMillis() + 60 * 60 * 1000))
            .sign(algorithm)
    }

    @Test
    fun `me endpoint returns user info when id_token is valid`() {
        val idToken = createValidIdToken()
        mockMvc.perform(get("/api/me").cookie(javax.servlet.http.Cookie("id_token", idToken)))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.sub").value("auth0|testuser"))
            .andExpect(jsonPath("$.name").value("テストユーザー"))
            .andExpect(jsonPath("$.email").value("test@example.com"))
    }

    @Test
    fun `me endpoint returns 401 when id_token is missing`() {
        mockMvc.perform(get("/api/me"))
            .andExpect(status().isUnauthorized)
            .andExpect(jsonPath("$.error").value("unauthorized"))
    }

    @Test
    fun `me endpoint returns 401 when id_token is invalid`() {
        mockMvc.perform(get("/api/me").cookie(javax.servlet.http.Cookie("id_token", "invalid.token.value")))
            .andExpect(status().isUnauthorized)
            .andExpect(jsonPath("$.error").value("invalid_token"))
    }
} 