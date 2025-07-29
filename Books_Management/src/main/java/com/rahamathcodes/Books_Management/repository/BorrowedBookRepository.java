package com.rahamathcodes.Books_Management.repository;

import com.rahamathcodes.Books_Management.models.BorrowedBook;
import com.rahamathcodes.Books_Management.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BorrowedBookRepository extends JpaRepository<BorrowedBook, Integer> {

    // Get all borrowed books by a specific user
    List<BorrowedBook> findByUser(Users user);

    // Optional: get all borrowed books by userId
    List<BorrowedBook> findByUserUserId(int userId);

    // Optional: check if a specific book is already borrowed by a user
    boolean existsByUserUserIdAndBookId(int userId, int bookId);

    // Finds borrowed books for a user and book ID where the book has not yet been returned
	List<BorrowedBook> findByUserUserIdAndBookIdAndReturnDateIsNull(int userId, int bookId);
}

