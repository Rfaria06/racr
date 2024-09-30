import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { TrackApiService } from 'src/app/shared/api/track/track-api.service';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  readonly form: FormGroup;
  readonly #api: ApiService;
  readonly #router: Router;
  tracks: Track[] = [];

  constructor(private tracksApi: TrackApiService) {
    const formBuilder = inject(FormBuilder);
    this.#api = inject(ApiService);
    this.#router = inject(Router);

    this.form = formBuilder.group({
      id: [''],
      user: [this.#api.getAuthStore().model!['id']],
      track: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      date: [Date.now()],
      created: [Date.now()],
      updated: [Date.now()],
    });
  }

  async ngOnInit() {
    this.tracks = await this.tracksApi.getAll();
    console.dir(this.tracks);
  }

  async onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      await this.#api.create('events', formValue);
      this.#router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.location.reload();
        }
      });
      this.#router.navigate(['/tabs/tab2']);
    }
  }
}
