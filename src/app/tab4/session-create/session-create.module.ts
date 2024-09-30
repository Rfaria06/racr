import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionCreatePageRoutingModule } from './session-create-routing.module';

import { SessionCreatePage } from './session-create.page';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditorModule,
    SessionCreatePageRoutingModule,
  ],
  declarations: [SessionCreatePage],
})
export class SessionCreatePageModule {}
