package com.rahamathcodes.Books_Management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rahamathcodes.Books_Management.models.Books;
import com.rahamathcodes.Books_Management.service.FavoriteService;

@RestController
@RequestMapping("/readit/favorites")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // Add a book to a user's favorites
    @PostMapping("/{userId}/{bookId}")
    public ResponseEntity<String> addFavorite(@PathVariable int userId, @PathVariable int bookId) {
        String message = favoriteService.addFavorite(userId, bookId);
        return ResponseEntity.ok(message); // Return confirmation message
    }

    // Get the list of favorite books for a specific user
    @GetMapping("/{userId}")
    public ResponseEntity<List<Books>> getFavorites(@PathVariable int userId) {
        return ResponseEntity.ok(favoriteService.getFavoritesByUser(userId));
    }

    // Remove a book from a user's favorites
    @DeleteMapping("/{userId}/{bookId}")
    public ResponseEntity<String> removeFavorite(@PathVariable int userId, @PathVariable int bookId) {
        favoriteService.removeFavorite(userId, bookId);
        return ResponseEntity.ok("Removed from favorites"); // Return success message
    }
    
    //Remove all favorites of an user
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteAllFavoritesByUserId(@PathVariable int userId) {
        favoriteService.deleteAllFavoritesByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}
