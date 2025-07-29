package com.rahamathcodes.Books_Management.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.rahamathcodes.Books_Management.models.Books;
import com.rahamathcodes.Books_Management.repository.BooksRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BooksService {

    // Injects the BooksRepository using constructor-based injection
    private final BooksRepository booksRepo;

    // Fetches all books from the database
    public List<Books> getAllBooks() {
        return booksRepo.findAll();
    }

    // Fetches a single book by its ID
    public Optional<Books> getBookById(int id) {
        return booksRepo.findById(id);
    }

    // Saves a new book with an optional image file
    public Books saveBookWithImage(String title, String author, String category, String description,
                                   boolean available, MultipartFile imageFile) throws IOException {
        Books book = new Books();
        book.setTitle(title);
        book.setAuthor(author);
        book.setCategory(category);
        book.setDescription(description != null ? description : "");
        book.setAvailable(available);

        // If image file is provided, convert it to bytes and store it
        if (imageFile != null && !imageFile.isEmpty()) {
            book.setImage(imageFile.getBytes());
        }

        return booksRepo.save(book); // Save the book to the database
    }

    // Updates an existing book using its ID
    public Books updateBook(int id, Books bookDetails) {
        return booksRepo.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setCategory(bookDetails.getCategory());
            book.setDescription(bookDetails.getDescription());
            book.setAvailable(bookDetails.isAvailable());
            return booksRepo.save(book); // Save the updated book
        }).orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    // Deletes a book by its ID
    public void deleteBook(int id) {
        booksRepo.deleteById(id);
    }
}
