package com.example.api.controller

import com.example.api.model.AuthCodeRequest
import com.example.api.model.LoginUrlResponse
import com.example.api.model.TokenResponse
import com.example.api.service.AuthService
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.test.context.TestPropertySource

@WebMvcTest(AuthController::class)
@TestPropertySource(locations = ["classpath:application-test.properties"])
class AuthControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var authService: AuthService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `login endpoint returns authorization url`() {
        val expectedUrl = "https://auth.example.com/authorize"
        Mockito.`when`(authService.createAuthorizationUrl()).thenReturn(expectedUrl)

        mockMvc.perform(get("/api/auth/login_url"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.authorizationUrl").value(expectedUrl))
    }

    @Test
    fun `exchangeCode endpoint returns ok result`() {
        val code = "test-code"
        val tokenResponse = TokenResponse(accessToken = "access-token", idToken = "id-token", expiresIn = 3600)
        Mockito.`when`(authService.exchangeCodeForToken(code)).thenReturn(tokenResponse)

        val request = AuthCodeRequest(code = code)
        val json = objectMapper.writeValueAsString(request)

        mockMvc.perform(post("/api/auth/code")
            .contentType(MediaType.APPLICATION_JSON)
            .content(json))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.result").value("ok"))
    }

    @Test
    fun `logout endpoint deletes cookie and returns logoutUrl`() {
        val expectedLogoutUrl = "https://auth.example.com/v2/logout?client_id=test-client-id&returnTo=https://app.example.com/after-logout"
        // application.properties等で値を上書きするか、@ValueをMockBeanで差し替える場合は追加実装が必要

        mockMvc.perform(post("/api/auth/logout"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.logoutUrl").value(expectedLogoutUrl))
            .andExpect(cookie().maxAge("id_token", 0))
    }
} 