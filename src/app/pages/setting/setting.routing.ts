import { WarehouseComponent } from './warehouse/warehouse.component';
import { OtherSettingComponent } from './other-setting/other-setting.component';
import { PartnerComponent } from './partner/partner.component';
import { ServiceComponent } from './service/service.component';
import { CustomerComponent } from './customer/customer.component';
import { ShipperComponent } from './shipper/shipper.component';
import { EmployeeComponent } from './employee/employee.component';
import { SettingComponent } from './setting.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
    {
        path: '', component: SettingComponent, children: [
            {
                path: '',
                redirectTo: 'employee',
                pathMatch: 'full',
            },
            {
                path: 'employee',
                component: EmployeeComponent,
            },
            {
                path: 'shipper',
                component: ShipperComponent,
            },
            {
                path: 'customer',
                component: CustomerComponent,
            },
            {
                path: 'warehouse',
                component: WarehouseComponent,
            },
            {
                path: 'service',
                component: ServiceComponent,
            },
            {
                path: 'partner',
                component: PartnerComponent,
            },
            {
                path: 'other-setting',
                component: OtherSettingComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingRoutingModule {
}
