import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from './footer/footer';
// import { LibrarianSidebar } from './librarian-sidebar/librarian-sidebar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Nav,FormsModule,CommonModule,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
    protected title = 'Books-Management';
  showNav = true;
  isLibrarian = true;

  constructor(private router: Router) {
    // Update `showNav` based on route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.showNav = !(url === '/login' || url === '/register' || url === '/');
      });
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    console.log('User Role:', role); // Debug
    // this.isLibrarian = role === 'LIBRARIAN';
  }
}
