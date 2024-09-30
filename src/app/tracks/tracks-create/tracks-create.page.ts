import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { New_Track } from 'src/app/shared/models/track';
import { TrackApiService } from 'src/app/shared/api/track/track-api.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tracks-create',
  templateUrl: './tracks-create.page.html',
  styleUrls: ['./tracks-create.page.scss'],
})
export class TracksCreatePage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: TrackApiService,
    private router: Router,
  ) {
    // Initialize the form group with controls and validators
    this.form = this.fb.group({
      id: [''],
      user: [api.apiService.getAuthStore().model!['id']],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      image: [null, [Validators.required]],
      website: ['', [Validators.required, Validators.pattern('https?://.+')]], // Validating URLs
      created: [Date.now()], // Default to current date
      updated: [Date.now()],
    });
  }
  // Handle form submission
  async onSubmit() {
    if (this.form.invalid) return;
    const formValue = this.form.value;
    await this.api.create(formValue).then((x) => {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // window.location.reload();
        }
      });
      this.router.navigate(['/tabs/tab1']);
    });
  }

  // Handle file input change for the image
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.form.patchValue({ image: formData });
    }
  }
}
