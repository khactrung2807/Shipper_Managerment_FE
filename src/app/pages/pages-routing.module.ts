
import { ProfileComponent } from './authen/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'delivery',
      loadChildren: () => import('./delivery/delivery.module')
        .then(m => m.DeliveryModule),
    },
    {
      path: 'setting',
      loadChildren: () => import('./setting/setting.module')
        .then(m => m.SettingModule),
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },

    {
      path: '',
      redirectTo: 'delivery',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
