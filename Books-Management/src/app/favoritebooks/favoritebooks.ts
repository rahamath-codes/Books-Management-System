import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Favoriteservice } from '../service/favoriteservice';

@Component({
  selector: 'app-favoritebooks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favoritebooks.html',
  styleUrl: './favoritebooks.css'
})
export class Favoritebooks implements OnInit {
  favoriteBooks: any[] = [];
  message = '';
  private userId: number = 0;

  constructor(private http: HttpClient,private favoriteService: Favoriteservice) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(user.id)
    this.userId = user.id;

    if (!this.userId) {
      this.message = 'User not logged in.';
      return;
    }

    this.loadFavorites();
  }

  loadFavorites(): void {
    this.http.get<any[]>(`http://localhost:8080/readit/favorites/${this.userId}`).subscribe({
      next: (books) => {
        this.favoriteBooks = books;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.message = 'Failed to load favorites.';
      }
    });
  }

  removeFromFavorite(bookId: number): void {
    let con = confirm("Are you sure want to remove the book from favorite?")
    if(con){
    this.favoriteBooks = this.favoriteBooks.filter(book => book.id !== bookId);
    this.http.delete(`http://localhost:8080/readit/favorites/${this.userId}/${bookId}`).subscribe({
      next: () => {
        this.favoriteBooks = this.favoriteBooks.filter(book => book.id !== bookId);
      },
      error: (err) => {
        console.error('Failed to remove from favorites:', err);
      }
    }); 
    }
  }
}
