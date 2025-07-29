package com.rahamathcodes.Books_Management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rahamathcodes.Books_Management.models.Books;

@Repository
public interface BooksRepository extends JpaRepository<Books, Integer>{

	
}
