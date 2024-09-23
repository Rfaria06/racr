import { AfterViewInit, Component, inject } from '@angular/core';
import { ApiService } from '../shared/api/api.service';
import { ProtectedPage } from '../shared/protected-page';
import { Participation, RacingEvent } from '../shared/types';
import { RecordModel } from 'pocketbase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page extends ProtectedPage implements AfterViewInit {
  readonly #apiService: ApiService;
  events: Array<RacingEvent> = [];
  participations: Array<Participation> = [];

  constructor() {
    super();
    this.#apiService = inject(ApiService);
  }

  async ngAfterViewInit() {
    await this.setEvents();
  }

  private async setEvents() {
    const eventsResponse: RecordModel[] = await this.#apiService.getAll(
      'events',
      {
        expand: 'track,user',
      },
    );

    const participationsResponse = await this.#apiService.getAll(
      'participations',
      { expand: 'user,event' },
    );

    this.events = eventsResponse.map((event) => ({
      id: event['id'],
      name: event['name'],
      description: event['description'],
      date: new Date(event['date']),
      track: event.expand!['track'],
      user: event.expand!['user'],
      // Use filter to only include matching participations
      participations: participationsResponse
        .filter((participation) => participation['event'] === event.id) // Filter out participations that don't match
        .map((participation) => ({
          user: participation.expand!['user'],
          event: participation.expand!['event'],
        })) as Participation[],
    }));
  }

  public async participate(event: RacingEvent) {
    await this.#apiService.create('participations', {
      user: this.#apiService.getAuthStore().model!['id'],
      event: event.id,
    });
  }
}
