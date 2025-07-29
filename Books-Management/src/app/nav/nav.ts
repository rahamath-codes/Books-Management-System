import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  searchTerm: string = '';
  isLibrarian = false;
  showLibrarianNav = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('User from localStorage:', user);
        this.isLibrarian = user.role === 'LIBRARIAN';
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { search: this.searchTerm.trim() }
      });
      this.searchTerm = '';
    }
  }

  logout() {
    const confirmLogout = confirm('Do you really want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }

  toggleLibrarianNav() {
    this.showLibrarianNav = !this.showLibrarianNav;
  }
}
