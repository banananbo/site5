package com.banananbo.service

import com.banananbo.model.User
import com.banananbo.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(private val userRepository: UserRepository) {

    @Transactional
    fun getOrCreateUser(auth0Id: String, email: String, name: String, pictureUrl: String?): User {
        return userRepository.findByAuth0Id(auth0Id) ?: createUser(auth0Id, email, name, pictureUrl)
    }

    private fun createUser(auth0Id: String, email: String, name: String, pictureUrl: String?): User {
        val user = User(
            auth0Id = auth0Id,
            email = email,
            name = name,
            pictureUrl = pictureUrl
        )
        return userRepository.save(user)
    }

    fun findByAuth0Id(auth0Id: String): User? {
        return userRepository.findByAuth0Id(auth0Id)
    }

    fun findByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }
} 