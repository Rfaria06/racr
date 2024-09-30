import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupCreatePage } from './setup-create.page';

const routes: Routes = [
  {
    path: '',
    component: SetupCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupCreatePageRoutingModule {}
