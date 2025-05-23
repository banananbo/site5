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

@WebMvcTest(AuthController::class)
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
    fun `exchangeCode endpoint returns token response`() {
        val code = "test-code"
        val tokenResponse = TokenResponse(accessToken = "access-token", expiresIn = 3600)
        Mockito.`when`(authService.exchangeCodeForToken(code)).thenReturn(tokenResponse)

        val request = AuthCodeRequest(code = code)
        val json = objectMapper.writeValueAsString(request)

        mockMvc.perform(post("/api/auth/code")
            .contentType(MediaType.APPLICATION_JSON)
            .content(json))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.accessToken").value("access-token"))
            .andExpect(jsonPath("$.expiresIn").value(3600))
    }
} 