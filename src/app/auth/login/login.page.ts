import { Component, inject, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/api/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  readonly #authService: AuthService;
  readonly #router: Router;

  email = '';
  password = '';
  error = '';

  constructor() {
    this.#authService = inject(AuthService);
    this.#router = inject(Router);
  }

  async login() {
    try {
      this.#authService.login(this.email, this.password);
      this.#router.navigate(['/']);
    } catch (error) {
      this.error = String(error);
    }
  }
}
