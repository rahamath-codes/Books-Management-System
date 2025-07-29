import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) return;

    this.http.post<any>('http://localhost:8080/readit/user/login', this.loginForm.value,{  withCredentials: true
})
      .subscribe({
        next: res => {
          console.log('Login response:', res);

          localStorage.setItem('currentUser', JSON.stringify(res));
          alert("You're Successfully Logged In!");
          
          if (res.role === 'USER') {
            this.router.navigate(['/home']);
          } else if (res.role === 'LIBRARIAN') {
            this.router.navigate(['/home']); // customize if needed
          } else {
            alert('Unknown role. Contact administrator.');
          }
        },
        error: err => {
          console.error('Login failed', err);
          this.errorMessage = err.error?.error || 'Invalid credentials.';
        }
      });
  }
}
