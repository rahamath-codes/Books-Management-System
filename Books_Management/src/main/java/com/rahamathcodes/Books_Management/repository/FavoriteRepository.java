package com.rahamathcodes.Books_Management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rahamathcodes.Books_Management.models.Favorite;

import jakarta.transaction.Transactional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    // Retrieves a list of favorite entries for a specific user by user ID
    List<Favorite> findByUserUserId(int userId);

    // Checks if a specific book is already marked as favorite by a user
    boolean existsByUserUserIdAndBookId(int userId, int bookId);
    
    // user.userId assuming field name is user in Favorite entity
    @Modifying
    @Transactional
    @Query("DELETE FROM Favorite f WHERE f.user.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);


}
