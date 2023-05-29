import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get('http://localhost:5000/dashboard/get-user-data');
    // return this.http.get('/dashboard');
  }

  refreshToken() {
    return this.http.get('http://localhost:5000/refresh-token');
    // return this.http.get('http://localhost:5000/dashboard');
  }
}
