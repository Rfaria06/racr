import { Component, inject } from '@angular/core';
import { TrackApiService } from '../shared/api/track/track-api.service';
import { Track } from '../shared/models/track';
import { RecordModel } from 'pocketbase';
import { AuthService } from '../shared/api/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  readonly #authService: AuthService;
  authenticated: boolean;

  constructor(public api: TrackApiService) {
    this.#authService = inject(AuthService);
    this.authenticated = this.#authService.isAuthenticated();
  }

  public tracks: Track[] = [];

  async ngOnInit() {
    this.tracks = await this.api.getAll();
  }

  public logout() {
    this.#authService.logout();
    window.location.reload();
  }
}
