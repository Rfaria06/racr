import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule,
      ),
  },
  {
    path: 'tracks-create',
    loadChildren: () =>
      import('./tracks/tracks-create/tracks-create.module').then(
        (m) => m.TracksCreatePageModule,
      ),
  },
  {
    path: 'event-create',
    loadChildren: () =>
      import('./tab2/event-create/event-create.module').then(
        (m) => m.EventCreatePageModule,
      ),
  },
  {
    path: 'session-create',
    loadChildren: () =>
      import('./tab4/session-create/session-create.module').then(
        (m) => m.SessionCreatePageModule,
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
