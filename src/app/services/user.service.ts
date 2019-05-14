import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              public router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + environment.loginUrl,{username: email, password: password})
    .pipe(
      map(res => {
        localStorage.setItem("token", JSON.stringify(res));
        return res;
      }),
      catchError(this.handleError)
    );
  }

  register(username: string, email: string, password: string, recaptcha: string): Observable<any> {
    return this.http.post(environment.apiUrl + environment.createUser, {
      username: username,
      email: email,
      password: password,
      recaptcha: recaptcha
    }).pipe(
      map(_ => {
        return this.login(email, password).subscribe();
      })
    );
  }

  logout():Observable<any> {
    return this.http.post(environment.apiUrl + environment.logoutUrl, {}).pipe(
      map(res => {
        localStorage.clear();
        this.router.navigate(['']);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + environment.currentUserUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0 || error.status == 401) {
      localStorage.clear();
      window.location.href = window.location.origin;
    }
    return throwError('Something bad happened; please try again later.');
  }
}
