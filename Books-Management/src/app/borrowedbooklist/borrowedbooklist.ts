import { Component } from '@angular/core';
import { BorrowService } from '../service/borrow-service';
import { Userservice } from '../service/userservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrowedbooklist',
  imports: [FormsModule,CommonModule],
  templateUrl: './borrowedbooklist.html',
  styleUrl: './borrowedbooklist.css'
})
export class Borrowedbooklist {
  borrowedBooks: any[] = [];
  message = '';

  constructor(private borrowService: BorrowService) {}

  ngOnInit(): void {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  console.log('Logged in user:', user);  // ✅ DEBUG LOG
  const userId = user?.id;

  if (!userId) {
    this.message = 'User not logged in.';
    return;
  }

  this.borrowService.getBorrowedBooksByUserId(userId).subscribe({
    next: (books) => {
      console.log('Fetched books:', books);  // ✅ DEBUG LOG
      this.borrowedBooks = books;
    },
    error: (err) => {
      console.error('Error fetching books:', err);  // ✅ DEBUG LOG
      this.message = 'Error fetching borrowed books';
    }
  });
}

}
