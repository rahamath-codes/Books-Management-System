package com.rahamathcodes.Books_Management.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BorrowedBookDTO {
	private String bookTitle;
	private String bookAuthor;
    private LocalDate borrowDate;
    private LocalDate returnDate;
}
