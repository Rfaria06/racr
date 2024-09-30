import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCreatePageRoutingModule } from './event-create-routing.module';

import { EventCreatePage } from './event-create.page';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
    ReactiveFormsModule,
    IonicModule,
    EventCreatePageRoutingModule,
  ],
  declarations: [EventCreatePage],
})
export class EventCreatePageModule {}
