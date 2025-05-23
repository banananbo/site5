package com.example.api.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.http.ResponseEntity
import com.auth0.jwt.JWT
import com.auth0.jwt.interfaces.DecodedJWT
import com.auth0.jwt.exceptions.JWTDecodeException

@RestController
@RequestMapping("/api")
class ApiController {

    @GetMapping("/hello")
    fun hello(): Map<String, String> {
        return mapOf("message" to "Hello from Kotlin/Spring Boot API!")
    }

    @GetMapping("/me")
    fun me(@CookieValue("id_token", required = false) idToken: String?): ResponseEntity<Map<String, Any>> {
        if (idToken.isNullOrBlank()) {
            return ResponseEntity.status(401).body(mapOf("error" to "unauthorized"))
        }
        try {
            val jwt: DecodedJWT = JWT.decode(idToken)
            val sub = jwt.subject ?: ""
            val name = jwt.getClaim("name").asString() ?: ""
            val email = jwt.getClaim("email").asString() ?: ""
            val userInfo = mapOf(
                "sub" to sub,
                "name" to name,
                "email" to email
            )
            return ResponseEntity.ok(userInfo)
        } catch (e: JWTDecodeException) {
            return ResponseEntity.status(401).body(mapOf("error" to "invalid_token"))
        }
    }
} 