import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class Userservice {
   private baseUrl = 'http://localhost:8080/readit/user';

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/email/${email}`);
  }
}
