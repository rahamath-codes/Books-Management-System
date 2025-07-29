import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
   this.registerForm = this.fb.group({
  userName: ['', Validators.required],
  userEmail: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatch });

  }
   
   passwordMatch(form: AbstractControl): ValidationErrors | null {
  const pass = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return pass === confirm ? null : { mismatch: true };
}

  
  goToLogin() {
    this.router.navigate(['/login']);
  }

 onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) return;

  const userPayload = { ...this.registerForm.value, role: 'USER' };

  this.http.post('http://localhost:8080/readit/user', userPayload, { responseType: 'text' })
    .subscribe({
      next: res => {
        console.log('User registered successfully', res);
        alert('Registration successful! Redirecting to login...');
        this.registerForm.reset();
        this.submitted = false;
        this.goToLogin();
      },
      error: err => {
        console.error('Registration failed', err);
      }
    });
}


}
