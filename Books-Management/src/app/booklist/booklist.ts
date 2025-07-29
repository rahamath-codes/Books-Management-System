import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './booklist.html',
  styleUrl: './booklist.css'
})
export class Booklist {
  books: any[] = [];
  favoriteBookIds: Set<number> = new Set<number>();
  userId: number = 0; // Get from localStorage if needed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userId = user.id;
    this.loadBooks();
    this.loadFavorites();
  }

  loadBooks(): void {
    this.http.get<any[]>('http://localhost:8080/readit/books').subscribe({
      next: (res) => this.books = res,
      error: (err) => console.error('Error fetching books:', err)
    });
  }

  loadFavorites(): void {
    this.http.get<any[]>(`http://localhost:8080/readit/favorites/${this.userId}`).subscribe({
      next: (favorites) => {
        this.favoriteBookIds = new Set(favorites.map(book => book.id));
      },
      error: (err) => console.error('Error fetching favorites:', err)
    });
  }

 toggleFavorite(bookId: number): void {
  if (this.favoriteBookIds.has(bookId)) {
    // Remove favorite
    this.http.delete(
      `http://localhost:8080/readit/favorites/${this.userId}/${bookId}`,
      { responseType: 'text' }  // 👈 tell Angular to expect plain text
    ).subscribe({
      next: () => this.favoriteBookIds.delete(bookId),
      error: (err) => console.error('Failed to unfavorite:', err)
    });
  } else {
    // Add to favorites
    this.http.post(
      `http://localhost:8080/readit/favorites/${this.userId}/${bookId}`,
      {},
      { responseType: 'text' }  // 👈 same here
    ).subscribe({
      next: () => this.favoriteBookIds.add(bookId),
      error: (err) => console.error('Failed to favorite:', err)
    });
  }
}

  isFavorite(bookId: number): boolean {
    return this.favoriteBookIds.has(bookId);
  }
}
