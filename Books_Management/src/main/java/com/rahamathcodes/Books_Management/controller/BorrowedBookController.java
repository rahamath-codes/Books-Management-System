package com.rahamathcodes.Books_Management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rahamathcodes.Books_Management.dto.BorrowRequest;
import com.rahamathcodes.Books_Management.dto.BorrowedBookDTO;
import com.rahamathcodes.Books_Management.models.BorrowedBook;
import com.rahamathcodes.Books_Management.models.Users;
import com.rahamathcodes.Books_Management.repository.UsersRepository;
import com.rahamathcodes.Books_Management.service.BorrowedBookService;

@RestController
@RequestMapping("/readit/borrow")
@CrossOrigin(origins = "http://localhost:4200") // Allow frontend access from Angular app
public class BorrowedBookController {

    @Autowired
    UsersRepository userRepository;

    @Autowired
    BorrowedBookService borrowedBookService;

    // API to borrow a book for a user
    @PostMapping
    public ResponseEntity<String> borrowBook(@RequestBody BorrowRequest req) {
        // Calls service to handle book borrowing logic
        borrowedBookService.borrowBook(req.getUserId(), req.getBookId());
        return ResponseEntity.ok("Book borrowed successfully!");
    }

    // API to return a borrowed book
    @PutMapping("/return")
    public ResponseEntity<String> returnBook(@RequestBody BorrowRequest req) {
        // Calls service to process the return of a borrowed book
        borrowedBookService.returnBook(req.getUserId(), req.getBookId());
        return ResponseEntity.ok("Book returned successfully!");
    }

    // API to get all books borrowed by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BorrowedBookDTO>> getBorrowedBooksByUser(@PathVariable int userId) {
        // Get list of borrowed book entities for the user
        List<BorrowedBook> borrowedBooks = borrowedBookService.getBorrowedBooksByUserId(userId);

        // Convert each BorrowedBook entity to a BorrowedBookDTO
        List<BorrowedBookDTO> result = borrowedBooks.stream()
            .map(book -> new BorrowedBookDTO(
                book.getBook().getTitle(),       // Get book title
                book.getBook().getAuthor(),      // Get book author
                book.getBorrowDate(),            // Borrow date
                book.getReturnDate()             // Return date
            ))
            .toList();

        return ResponseEntity.ok(result); // Return list of borrowed books in DTO format
    }

    // API to fetch user details using email address
    @GetMapping("/email")
    public ResponseEntity<Users> getUserByEmail(@RequestParam String email) {
        // Search user by email using repository
        Users user = userRepository.findByUserEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
}
