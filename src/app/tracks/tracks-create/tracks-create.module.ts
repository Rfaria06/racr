import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackApiService } from 'src/app/shared/api/track/track-api.service';

import { IonicModule } from '@ionic/angular';

import { TracksCreatePageRoutingModule } from './tracks-create-routing.module';

import { TracksCreatePage } from './tracks-create.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TracksCreatePageRoutingModule,
    ],
  declarations: [TracksCreatePage],
})
export class TracksCreatePageModule {}
