import { Component } from '@angular/core';
import { TrackApiService } from '../shared/api/track/track-api.service';
import { Track } from '../shared/models/track';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private api: TrackApiService) {}

  public tracks: Track[] = [];

  async ngOnInit(){
    this.tracks = await this.api.getAll()
    console.log(this.tracks)
  }

  OnClick(){
    
  }
}
