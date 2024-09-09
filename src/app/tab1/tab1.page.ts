import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/api/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  readonly #authService: AuthService;

  authenticated: boolean;
  constructor() {
    this.#authService = inject(AuthService);
    this.authenticated = this.#authService.isAuthenticated();
  }

  public logout() {
    this.#authService.logout();
  }
}
