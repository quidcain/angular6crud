import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  private url = 'http://localhost:8080/users/login';

  constructor(private http: HttpClient) { }

  attemptLogin(username: string, password: string): Observable<any> {
    const body = {username, password};
    return this.http.post(this.url, body, httpOptions);
  }
}
