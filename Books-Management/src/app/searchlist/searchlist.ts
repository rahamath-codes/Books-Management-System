import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-searchlist',
  imports: [CommonModule, RouterModule],
  templateUrl: './searchlist.html',
  styleUrl: './searchlist.css'
})
export class Searchlist {
  searchTerm: string = '';
  allBooks: any[] = [];
  filteredBooks: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.fetchBooks();
    });
  }

  fetchBooks(): void {
    this.http.get<any[]>('http://localhost:8080/readit/books').subscribe({
      next: (books) => {
        this.allBooks = books;
        this.applyFilter();
      },
      error: (err) => console.error('Error fetching books:', err)
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredBooks = this.allBooks.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category?.toLowerCase().includes(term)
    );
  }
}
