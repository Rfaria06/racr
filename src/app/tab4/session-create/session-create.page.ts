import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { NewMychronSession } from 'src/app/shared/types';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.page.html',
  styleUrls: ['./session-create.page.scss'],
})
export class SessionCreatePage implements OnInit {
  form: FormGroup;
  events: { id: string; name: string }[] = [];
  tracks: { id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [''],
      user: [apiService.getAuthStore().model!['id']],
      track: ['', [Validators.required]],
      event: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      file: [null, [Validators.required]],
    });
  }

  async ngOnInit() {
    const eventsResponse = await this.apiService.getAll('events');
    this.events = eventsResponse.map((event) => ({
      id: event.id,
      name: event['name'],
    }));

    const tracksResponse = await this.apiService.getAll('tracks');
    this.tracks = tracksResponse.map((track) => ({
      id: track.id,
      name: track['name'],
    }));
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const formValue = this.form.value;
    console.dir(formValue);
    await this.apiService.create(
      'mychron_sessions',
      new NewMychronSession(
        '',
        formValue.user,
        formValue.track,
        formValue.name,
        formValue.description,
        formValue.file.get('file'),
        formValue.event,
      ),
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
    this.router.navigate(['/tabs/tab4']);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.form.patchValue({ file: formData });
    }
  }
}
