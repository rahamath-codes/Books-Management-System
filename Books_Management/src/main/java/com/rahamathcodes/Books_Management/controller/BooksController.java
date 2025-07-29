package com.rahamathcodes.Books_Management.controller; 

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.rahamathcodes.Books_Management.models.Books;
import com.rahamathcodes.Books_Management.service.BooksService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/readit/books")
public class BooksController {

     Logger logger = LoggerFactory.getLogger(BooksController.class);

    private final BooksService booksService;

    @Autowired
    public BooksController(BooksService booksService) {
        this.booksService = booksService;
    }

    @GetMapping
    public List<Books> getAllBooks() {
        List<Books> books = booksService.getAllBooks();
        logger.info("Fetched all books. Total: {}", books.size());
        return books;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Books> getBookById(@PathVariable int id) {
        logger.debug("Fetching book with ID: {}", id);
        return booksService.getBookById(id)
                .map(book -> {
                    logger.info("Book found: {}", book.getTitle());
                    return ResponseEntity.ok(book);
                })
                .orElseGet(() -> {
                    logger.warn("Book with ID {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getBookImage(@PathVariable int id) {
        logger.debug("Fetching image for book ID: {}", id);
        return booksService.getBookById(id)
                .map(book -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                        .body(book.getImage()))
                .orElseGet(() -> {
                    logger.warn("Image not found for book ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Books> createBook(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam String category,
            @RequestParam(required = false) String description,
            @RequestParam(defaultValue = "true") boolean available,
            @RequestParam(required = false) MultipartFile image) {
        try {
            Books created = booksService.saveBookWithImage(title, author, category, description, available, image);
            logger.info("New book created: {} by {}", title, author);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IOException e) {
            logger.error("Image processing failed while creating book: {}", title, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable int id, @RequestBody Books bookDetails) {
        try {
            Books updated = booksService.updateBook(id, bookDetails);
            logger.info("Book updated: ID={}, Title={}", id, updated.getTitle());
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            logger.warn("Failed to update book. Book with ID {} not found", id);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable int id) {
        booksService.deleteBook(id);
        logger.info("Deleted book with ID: {}", id);
        return ResponseEntity.noContent().build();
    }
}
