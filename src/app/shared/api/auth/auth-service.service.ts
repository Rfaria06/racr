import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseAuthStore } from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  #apiService: ApiService;

  constructor() {
    this.#apiService = inject(ApiService);
  }

  public async register(
    email: string,
    password: string,
    passwordConfirm: string
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
}
