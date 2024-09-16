import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/api/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  readonly #authService: AuthService;
  readonly #router: Router;

  email = '';
  password = '';
  passwordConfirm = '';

  constructor() {
    this.#authService = inject(AuthService);
    this.#router = inject(Router);
  }

  async register() {
    await this.#authService.register(
      this.email,
      this.password,
      this.passwordConfirm,
    );
    this.#router.navigate(['/']);
  }
}
