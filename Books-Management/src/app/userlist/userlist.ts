import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './userlist.html',
  styleUrl: './userlist.css'
})
export class Userlist implements OnInit {
   users: any[] = [];
  selectedUser: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8080/readit/user').subscribe({
      next: res => this.users = res,
      error: err => console.error('Failed to load users', err)
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:8080/readit/user/${id}`).subscribe({
        next: () => this.loadUsers(),
        error: err => alert("Not yet returned the borrowed books.")
      });
    }
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; // Clone to avoid direct binding
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  updateUser() {
    this.http.put(`http://localhost:8080/readit/user/${this.selectedUser.userId}`, this.selectedUser,)
      .subscribe({
        next: () => {
          this.loadUsers();
          this.selectedUser = null;
        },
        error: err => console.error('Update failed', err)
      });
  }
}
