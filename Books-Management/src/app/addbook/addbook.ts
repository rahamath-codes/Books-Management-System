import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addbook',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './addbook.html',
  styleUrl: './addbook.css'
})

export class Addbook {
  bookForm: FormGroup;
  selectedImage: File | null = null;
  submitted: boolean = false;
  categoryTypes: string[] = [
  'Art',
  'Travel',
  'Philosophy',
  'Technology',
  'Biographies',
  'History',
  'Fiction'
];


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      available: [true]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.bookForm.get('title')?.value);
    formData.append('author', this.bookForm.get('author')?.value);
    formData.append('category', this.bookForm.get('category')?.value);
    formData.append('description', this.bookForm.get('description')?.value || '');
    formData.append('available', this.bookForm.get('available')?.value);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.http.post('http://localhost:8080/readit/books', formData).subscribe({
      next: (res) => {
        alert("Book added Successfully");  
        console.log('Book added:', res);
        this.bookForm.reset({ available: true });
        this.selectedImage = null;
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error adding book:', err);
      }
    });
  }
}
