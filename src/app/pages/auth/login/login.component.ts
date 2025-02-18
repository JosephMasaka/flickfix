import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="container mx-auto p-5">
      <h1 class="text-3xl">Login</h1>
      <input type="text" #username placeholder="Username">
      <input type="password" #password placeholder="Password">
      <button (click)="login(username.value, password.value)">Login</button>
    </div>
  `
})
export class LoginComponent {
  authService = inject(AuthService);

  login(username: string, password: string) {
    this.authService.login(username, password);
  }
}
