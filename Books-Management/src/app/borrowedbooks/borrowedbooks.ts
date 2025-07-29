import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-borrowedbooks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './borrowedbooks.html',
  styleUrls: ['./borrowedbooks.css']
})
export class Borrowedbooks implements OnInit {
  userId: number = 0;
  bookId: number | null = null;
  message: string = '';
  borrowedBooks: any[] = [];
  userName: string = '';
  userEmail: string = '';


  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.getBorrowedBooks();
    }
  }

  borrowBook() {
    if (!this.userId || !this.bookId) {
      this.message = "User ID and Book ID are required.";
      return;
    }

    const borrowRequest = {
      userId: this.userId,
      bookId: this.bookId
    };

    this.http.post('http://localhost:8080/readit/borrow', borrowRequest, { responseType: 'text', withCredentials: true })
      .subscribe({
        next: res => {
          this.message = res;
          this.getBorrowedBooks(); // refresh
          this.bookId = null;
          alert("Book Borrowed Successfully!");
        },
        error: err => {
          this.message = err.error || 'Borrow failed.';
        }
      });
  }

  returnBook() {
    if (!this.userId || !this.bookId) {
      this.message = "User ID and Book ID are required.";
      return;
    }

    const returnRequest = {
      userId: this.userId,
      bookId: this.bookId
    };

    this.http.put('http://localhost:8080/readit/borrow/return', returnRequest, { responseType: 'text', withCredentials: true })
      .subscribe({
        next: res => {
          this.message = res;
          this.getBorrowedBooks(); // refresh
          this.bookId = null;
          alert("Book returned Successfully!");
        },
        error: err => {
          this.message = err.error || 'Return failed.';
        }
      });
  }

  getBorrowedBooks() {
    if (!this.userId) {
      this.message = "User ID is required.";
      return;
    }

    this.http.get<any[]>(`http://localhost:8080/readit/borrow/user/${this.userId}`, { withCredentials: true })
      .subscribe({
        next: data => {
          this.borrowedBooks = data;
          console.log(data)
          this.message = '';
        },
        error: err => {
          this.message = 'Failed to fetch borrowed books. ' + err.message;
        }
      });

    this.getUserById(this.userId);
  }
  returnBookById(bookId: number) {
  this.bookId = bookId;
  this.returnBook();
}
  getUserById(userId: number) {
  this.http.get<any>(`http://localhost:8080/readit/user/${userId}`).subscribe({
    next: user => {
      this.userName = user.userName;
      this.userEmail = user.userEmail;
    },
    error: err => {
      console.error('Error fetching user:', err);
    }
  });
}

}
