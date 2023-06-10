import { MatPaginatorModule } from '@angular/material/paginator';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { MatTableModule } from '@angular/material/table';
import { SettingRoutingModule } from './setting.routing';
import { NgModule } from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbDialogModule,
    NbInputModule,
    NbAutocompleteModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { ShipperComponent } from './shipper/shipper.component';
import { CustomerComponent } from './customer/customer.component';
import { ServiceComponent } from './service/service.component';
import { PartnerComponent } from './partner/partner.component';
import { OtherSettingComponent } from './other-setting/other-setting.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddwarehouseComponent } from './warehouse/addwarehouse/addwarehouse.component';
import { AddserviceComponent } from './service/addservice/addservice.component';
import { AddshipperComponent } from './shipper/addshipper/addshipper.component';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import {  MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
@NgModule({
    imports: [
        AgmCoreModule,
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NbAutocompleteModule,
        NbButtonModule,
        NgxEchartsModule,
        SettingRoutingModule,
        MatTableModule,
        NbDialogModule.forRoot(),
        NbInputModule,
        MatGoogleMapsAutocompleteModule,
        GooglePlaceModule,
        MatPaginatorModule
    ],
    declarations: [
        EmployeeComponent,
        ShipperComponent,
        CustomerComponent,
        ServiceComponent,
        PartnerComponent,
        OtherSettingComponent,
        WarehouseComponent,
        AddwarehouseComponent,
        AddserviceComponent,
        AddshipperComponent,
        AddemployeeComponent,
    ],
    entryComponents: [
        AddwarehouseComponent,
        AddserviceComponent,
        AddshipperComponent,
        AddemployeeComponent,
    ],
})
export class SettingModule { }
