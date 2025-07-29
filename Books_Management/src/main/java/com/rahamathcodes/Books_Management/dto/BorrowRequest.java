package com.rahamathcodes.Books_Management.dto;

public class BorrowRequest {
    private int userId;
    private int bookId;

    // Getters and setters
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public int getBookId() {
        return bookId;
    }
    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
}
