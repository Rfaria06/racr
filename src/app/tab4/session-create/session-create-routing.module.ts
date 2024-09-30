import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionCreatePage } from './session-create.page';

const routes: Routes = [
  {
    path: '',
    component: SessionCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionCreatePageRoutingModule {}
