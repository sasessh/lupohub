import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    component: HeaderComponent,  // TODO HomeComponent
  },
  { path: '**', redirectTo: '' },
];
