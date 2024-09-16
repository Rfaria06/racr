import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseAuthStore } from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #apiService: ApiService;

  constructor() {
    this.#apiService = inject(ApiService);
  }

  public async register(
    email: string,
    password: string,
    passwordConfirm: string,
  ) {
    await this.#apiService.create('users', {
      email,
      emailVisibility: true,
      password,
      passwordConfirm,
    });
    return await this.login(email, password);
  }

  public async login(email: string, password: string): Promise<BaseAuthStore> {
    return await this.#apiService._login(email, password);
  }

  public isAuthenticated(): boolean {
    return this.#apiService.getAuthStore().isValid;
  }

  public getUserId(): string {
    return this.#apiService.getAuthStore().model!['id'];
  }

  public logout() {
    this.#apiService.getAuthStore().clear();
  }
}
