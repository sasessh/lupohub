import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environment';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}login/`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.accessTokenKey, response['access']);
          localStorage.setItem(this.refreshTokenKey, response['refresh']);
          this.router.navigate(['/']);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (refreshToken) {
      const url = `${environment.apiUrl}token/refresh/`;
      const body = { refresh: refreshToken };
      return this.httpClient
        .post<any>(url, body)
        .pipe(
          tap((response) => {
            if (response && response['access']) {
              localStorage.setItem(this.accessTokenKey, response['access']);
            }
          }),
          catchError((error) => {
            this.logout();
            return throwError(error);
          })
        );
    } else {
      this.logout();
      return throwError('No refresh token available');
    }
  }
}
