import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated: Signal<boolean> = signal(false);

  login(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = signal(true); // Reassigning a new signal
    }
  }

  logout() {
    this.isAuthenticated = signal(false); // Reassigning a new signal
  }
}
