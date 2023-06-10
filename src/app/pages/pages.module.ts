import { MatPaginator } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './authen/profile/profile.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { NbIconLibraries, NbMenuModule, NbCardModule, NbListComponent, NbListModule, NbAccordionModule, NbInputModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { SettingComponent } from './setting/setting.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NgbModalModule,
    NgxEchartsModule,
    NbCardModule,
    NbListModule,
    NbAccordionModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    DeliveryComponent,
    SettingComponent,
    ProfileComponent
  ],
})
export class PagesModule {
  constructor(iconsLibrary: NbIconLibraries) { iconsLibrary.registerSvgPack('myicon', { 'delivery': '<img src="../../assets/images/delivery-man.png" width="18px">', }); }
}
