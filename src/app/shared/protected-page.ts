import { inject } from '@angular/core';
import { AuthService } from './api/auth/auth.service';
import { RecordModel } from 'pocketbase';

export class ProtectedPage {
  protected authService: AuthService;
  authenticated: boolean;

  constructor() {
    this.authService = inject(AuthService);
    this.authenticated = this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
    window.location.reload();
  }
}
