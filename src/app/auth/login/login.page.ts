import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
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
      await this.#authService.login(this.email, this.password);
      this.#router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.location.reload();
        }
      });
      this.#router.navigate(['/']);
    } catch (error) {
      this.error = String(error);
    }
  }
}
