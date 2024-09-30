import { Component, inject, OnInit } from '@angular/core';
import { TrackApiService } from '../shared/api/track/track-api.service';
import { Track } from '../shared/models/track';
import { RecordModel } from 'pocketbase';
import { AuthService } from '../shared/api/auth/auth.service';
import { ProtectedPage } from '../shared/protected-page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page extends ProtectedPage implements OnInit {
  constructor(public api: TrackApiService) {
    super();
  }

  public tracks: Track[] = [];

  async ngOnInit() {
    this.tracks = await this.api.getAll();
  }

  public isUserOwner(track: Track): boolean {
    const currentUserId = this.api.apiService.getAuthStore().model!['id'];
    return track.user == currentUserId;
  }

  public async deleteTrack(track: Track) {
    await this.api.delete(track.id);
    this.tracks = this.tracks.filter((x) => x.id !== track.id);
  }
}
