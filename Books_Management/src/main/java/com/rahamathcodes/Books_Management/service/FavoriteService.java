package com.rahamathcodes.Books_Management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rahamathcodes.Books_Management.models.Books;
import com.rahamathcodes.Books_Management.models.Favorite;
import com.rahamathcodes.Books_Management.models.Users;
import com.rahamathcodes.Books_Management.repository.BooksRepository;
import com.rahamathcodes.Books_Management.repository.FavoriteRepository;
import com.rahamathcodes.Books_Management.repository.UsersRepository;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepo;

    @Autowired    
    private UsersRepository userRepo;

    @Autowired
    private BooksRepository bookRepo;

    // Adds a book to the user's favorites list
    public String addFavorite(int userId, int bookId) {
        // Check if the book is already in the user's favorites
        if (favoriteRepo.existsByUserUserIdAndBookId(userId, bookId)) {
            return "Book is already in favorites";
        }

        // Fetch the user by ID, or throw an exception if not found
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the book by ID, or throw an exception if not found
        Books book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Create and save a new Favorite entry
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setBook(book);
        favoriteRepo.save(favorite);

        return "Book added to favorites";
    }

    // Retrieves a list of favorite books for a specific user
    public List<Books> getFavoritesByUser(int userId) {
        List<Favorite> favorites = favoriteRepo.findByUserUserId(userId);
        // Extract the book from each Favorite entry
        return favorites.stream()
                        .map(Favorite::getBook)
                        .collect(Collectors.toList());
    }

    // Removes a book from the user's favorites list
    public void removeFavorite(int userId, int bookId) {
        // Find all favorites for the user
        List<Favorite> favorites = favoriteRepo.findByUserUserId(userId);

        // Look for the matching book and delete it
        for (Favorite fav : favorites) {
            if (fav.getBook().getId() == bookId) {
                favoriteRepo.delete(fav);
                break; // Stop after deleting the first match
            }
        }
    }
    
    public void deleteAllFavoritesByUserId(int userId) {
    	if (!favoriteRepo.findByUserUserId(userId).isEmpty()) {
            favoriteRepo.deleteByUserId(userId);
        }
    }
    
}
