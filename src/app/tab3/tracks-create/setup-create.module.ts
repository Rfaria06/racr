import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupCreatePageRoutingModule } from './setup-create-routing.module';
import { SetupCreatePage } from './setup-create.page';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SetupCreatePageRoutingModule,
    EditorModule
    ],
  declarations: [SetupCreatePage],
})
export class SetupCreatePageModule {}
