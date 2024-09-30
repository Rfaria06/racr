import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ApiService } from '../shared/api/api.service';
import { ProtectedPage } from '../shared/protected-page';
import { Participation, RacingEvent } from '../shared/types';
import { RecordModel } from 'pocketbase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page extends ProtectedPage implements OnInit {
  readonly #apiService: ApiService;
  events: Array<RacingEvent> = [];

  constructor(private cdr: ChangeDetectorRef) {
    super();
    this.#apiService = inject(ApiService);
  }

  async ngOnInit() {
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
      participations: participationsResponse
        .filter((participation) => participation['event'] === event.id)
        .map((participation) => ({
          id: participation.id,
          user: participation.expand!['user'],
          event: participation.expand!['event'],
        })),
    }));
  }

  public isUserParticipating(event: RacingEvent): boolean {
    const currentUserId = this.#apiService.getAuthStore().model!['id'];

    return (
      event.participations?.some(
        (participation) => participation.user!['id'] === currentUserId,
      ) || false
    );
  }

  public async participate(event: RacingEvent) {
    const participation = await this.#apiService.create(
      'participations',
      {
        user: this.#apiService.getAuthStore().model!['id'],
        event: event.id,
      },
      { expand: 'user' },
    );
    event.participations?.unshift({
      id: participation.id,
      user: participation.expand!['user'],
      event: event,
    });
    event.participations = event.participations;
  }

  public async cancelParticipation(event: RacingEvent) {
    const currentUserId = this.#apiService.getAuthStore().model!['id'];
    const participation = event.participations?.find(
      (x) => x.user!['id'] === currentUserId,
    );

    if (participation && participation.id) {
      await this.#apiService.delete('participations', participation.id);

      event.participations = event.participations?.filter(
        (x) => x.id !== participation.id,
      );
    }
  }

  public isUserOwner(event: RacingEvent): boolean {
    const currentUserId = this.#apiService.getAuthStore().model!['id'];
    return event!['user']!['id'], currentUserId;
  }

  public async deleteEvent(event: RacingEvent) {
    await this.#apiService.delete('events', event.id);
    this.events = this.events.filter((x) => x.id !== event.id);
  }
}
