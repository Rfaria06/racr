import { Component, inject, OnInit } from '@angular/core';
import { ProtectedPage } from '../shared/protected-page';
import { ApiService } from '../shared/api/api.service';
import { MychronSession } from '../shared/types';
import { RecordModel } from 'pocketbase';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page extends ProtectedPage implements OnInit {
  readonly #apiService: ApiService;
  sessions: Array<MychronSession> = [];

  constructor() {
    super();
    this.#apiService = inject(ApiService);
  }

  async ngOnInit() {
    await this.setSessions();
  }

  async setSessions() {
    const sessionsResponse = await this.#apiService.getAll('mychron_sessions', {
      expand: 'user,track,event',
    });

    this.sessions = sessionsResponse.map((session) => ({
      id: session.id,
      name: session['name'],
      description: session['description'],
      user: session.expand?.['user'],
      track: session.expand?.['track'],
      event: session.expand?.['event'],
      file: session['file'],
      fileUrl: this.#apiService.getFileUrl(session, session['file']),
    }));
  }

  isUserOwner(session: MychronSession): boolean {
    const currentUserId = this.#apiService.getAuthStore().model!['id'];
    return session.user?.['id'] == currentUserId;
  }

  async deleteSession(session: MychronSession) {
    await this.#apiService.delete('mychron_sessions', session.id);
    this.sessions = this.sessions.filter((x) => x.id !== session.id);
  }
}
