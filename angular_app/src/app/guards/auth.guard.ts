import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const expiryTime = decodedToken.exp * 1000;
      if (expiryTime > Date.now()) {
        return true;
      } else {
        return this.authService.refreshToken().pipe(
          tap(() => true),
          catchError(() => {
            this.router.navigate(['/login']);
            return [false];
          })
        );
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
