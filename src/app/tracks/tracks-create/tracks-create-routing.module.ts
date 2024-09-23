import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TracksCreatePage } from './tracks-create.page';

const routes: Routes = [
  {
    path: '',
    component: TracksCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksCreatePageRoutingModule {}
