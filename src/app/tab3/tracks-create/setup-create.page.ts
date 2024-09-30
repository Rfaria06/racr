import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackApiService } from 'src/app/shared/api/track/track-api.service';
import { Router } from '@angular/router';
import { Setup } from 'src/app/shared/models/setup';
import { SetupService } from 'src/app/shared/api/setup/setup.service';


@Component({
  selector: 'app-setup-create',
  templateUrl: './setup-create.page.html',
  styleUrls: ['./setup-create.page.scss'],
})
export class SetupCreatePage{

  setupForm: FormGroup;

  constructor(private fb: FormBuilder, private api: SetupService, private router: Router) {
    this.setupForm = this.fb.group({
      name: ['', Validators.required], // Name field
      description: ['', Validators.required], // Description field
      weatherCondition: ['Dry', Validators.required] // Default weather condition
    });
  }
  
  submitSetup() {
    if (this.setupForm.valid) {
      console.log('Setup Created:', this.setupForm.value);
      var formValue = this.setupForm.value
      var setup = new Setup("", this.api.apiService.getAuthStore().model!['id'], formValue.name, formValue.description, formValue.weatherCondition)
      this.api.create(setup);
    }
    this.router.navigate(["/tabs/tab3"]);
  }
}

