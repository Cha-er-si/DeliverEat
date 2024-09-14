import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let credentials = {
      username,
      password,
    };

    return this.http.post('http://localhost:5000/user/login', credentials);
    // return this.http.post('/user/login', credentials);
  }

  register(email: string, username: string, password: string) {
    let credentials = {
      firstName: username,
      lastName: '',
      email,
      username,
      password,
    };

    // console.log({ credentials });

    return this.http.post('http://localhost:5000/user/register', credentials);
    // return this.http.post("/user/register", credentials);
  }

  changePassword(email: string, oldPassword: string, newPassword: string) {
    let credentials = {
      email,
      oldPassword,
      newPassword,
    };

    // console.log({ credentials });

    return this.http.post(
      'http://localhost:5000/user/change-password',
      credentials
    );
    // return this.http.post("/user/register", credentials);
  }
}
