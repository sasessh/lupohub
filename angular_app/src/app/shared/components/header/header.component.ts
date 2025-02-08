import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
