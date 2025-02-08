import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../../material.module';
import { environment } from '../../../../../environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      this._snackBar.open('Podaj dane logowania!', 'Zamknij', {
        panelClass: ['snackbar-warning'],
        duration: environment.snackbarDuration,
      });
      return;
    }

    this.authService
      .login(formData.value.username, formData.value.password)
      .subscribe(
        (response) => {
          // this._snackBar.open('Zalogowano pomyślnie!', 'Zamknij', {
          //   duration: environment.snackbarDuration,
          // });
        },
        (error) => {
          if (error.status === 400 || error.status === 401) {
            this._snackBar.open('Nieprawidłowe dane logowania!', 'Zamknij', {
              panelClass: ['snackbar-warning'],
              duration: environment.snackbarDuration,
            });
          } else {
            this._snackBar.open('Nie udało się zalogować!', 'Zamknij', {
              panelClass: ['snackbar-warning'],
              duration: environment.snackbarDuration,
            });
            console.log(error);
          }
        }
      );
  }
}
