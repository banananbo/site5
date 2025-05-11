package com.example.api.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import com.auth0.client.auth.AuthAPI

@Configuration
class Auth0Config {
    
    @Value("\${auth0.domain}")
    private lateinit var domain: String
    
    @Value("\${auth0.clientId}")
    private lateinit var clientId: String
    
    @Value("\${auth0.clientSecret}")
    private lateinit var clientSecret: String
    
    @Value("\${auth0.audience}")
    private lateinit var audience: String

    @Bean
    fun authAPI(): AuthAPI {
        return AuthAPI(domain, clientId, clientSecret)
    }
} 