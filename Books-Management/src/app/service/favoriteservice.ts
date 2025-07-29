import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Favoriteservice {
  constructor(private http: HttpClient) {}

  deleteAllFavoritesByUser(userId: number) {
  return this.http.delete(`http://localhost:8080/readit/favorites/user/${userId}`);
  }
}
