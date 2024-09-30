import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionCreatePageRoutingModule } from './session-create-routing.module';

import { SessionCreatePage } from './session-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SessionCreatePageRoutingModule,
  ],
  declarations: [SessionCreatePage],
})
export class SessionCreatePageModule {}
