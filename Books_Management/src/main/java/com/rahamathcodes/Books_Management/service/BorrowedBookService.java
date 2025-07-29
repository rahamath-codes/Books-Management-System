package com.rahamathcodes.Books_Management.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rahamathcodes.Books_Management.models.Books;
import com.rahamathcodes.Books_Management.models.BorrowedBook;
import com.rahamathcodes.Books_Management.models.Users;
import com.rahamathcodes.Books_Management.repository.BorrowedBookRepository;

@Service
public class BorrowedBookService {

    @Autowired
    BorrowedBookRepository repo;

    // This method creates a new borrow record for a user and a book
    public void borrowBook(int userId, int bookId) {
        BorrowedBook b = new BorrowedBook();
        b.setUser(new Users(userId)); // Set the user who is borrowing
        b.setBook(new Books(bookId)); // Set the book being borrowed
        b.setBorrowDate(LocalDate.now()); // Set today's date as borrow date
        repo.save(b); // Save the record in the database
    }

    // This method marks a borrowed book as returned by setting the return date
    public void returnBook(int userId, int bookId) {
        // Find the borrow record where the return date is still null
        List<BorrowedBook> borrows = repo.findByUserUserIdAndBookIdAndReturnDateIsNull(userId, bookId);
        if (!borrows.isEmpty()) {
            BorrowedBook b = borrows.get(0);
            b.setReturnDate(LocalDate.now()); // Set return date to today
            repo.save(b); // Update the record in the database
        }
    }

    // Get all borrowed books (past and present) for a specific user
    public List<BorrowedBook> getBorrowedBooksByUserId(int userId) {
        return repo.findByUserUserId(userId);
    }

    // Duplicate method doing the same as above — can be removed if unused
    public List<BorrowedBook> getBorrowedBooksByUser(int userId) {
        return repo.findByUserUserId(userId);
    }
}
