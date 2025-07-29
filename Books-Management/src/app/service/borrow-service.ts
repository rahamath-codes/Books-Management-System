import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Borrowrequest } from '../models/borrowrequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private baseUrl = 'http://localhost:8080/readit/borrow';

  constructor(private http: HttpClient) {}

  borrowBook(req: Borrowrequest): Observable<any> {
    return this.http.post(this.baseUrl, req);
  }

  returnBook(req: Borrowrequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/return`, req);
  }

  getBorrowedBooksByUserId(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/readit/borrow/user/${userId}`);
}

}
