import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managebooks',
  imports: [FormsModule,CommonModule],
  templateUrl: './managebooks.html',
  styleUrl: './managebooks.css'
})
export class Managebooks {
  books: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<any[]>('http://localhost:8080/readit/books').subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Failed to fetch books', err)
    });
  }

  deleteBook(bookId: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.http.delete(`http://localhost:8080/readit/books/${bookId}`,{  withCredentials: true
}).subscribe({
        next: () => {
          this.books = this.books.filter(b => b.id !== bookId);
        },
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
  editingId: number | null = null;
originalBook: any = {};

startEdit(bookId: number) {
  this.editingId = bookId;
  const book = this.books.find(b => b.id === bookId);
  this.originalBook = { ...book }; // Backup original in case of cancel
}

cancelEdit() {
  const index = this.books.findIndex(b => b.id === this.editingId);
  this.books[index] = { ...this.originalBook };
  this.editingId = null;
}

saveEdit(book: any) {
  this.http.put(`http://localhost:8080/readit/books/${book.id}`, book).subscribe({
    next: () => {
      this.editingId = null;
    },
    error: err => {
      console.error('Update failed:', err);
    }
  });
}

}
