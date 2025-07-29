package com.rahamathcodes.Books_Management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rahamathcodes.Books_Management.models.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

    // Finds a user by their email address
    Optional<Users> findByUserEmail(String userEmail);
}
