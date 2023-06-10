import { ReportDeliveryComponent } from './report/report-delivery/report-delivery.component';

import { ReportShipperComponent } from './report/report-shipper/report-shipper.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliverTimesComponent } from './deliver-times/deliver-times.component';
import { OrderComponent } from './order/order.component';
import { DeliveryComponent } from './delivery.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
    {
        path: '', component: DeliveryComponent, children: [
            {
                path: '',
                redirectTo: 'deliver-times',
                pathMatch: 'full',
            },
            {
                path: 'dashboard/:id',
                component: DashboardComponent,
            },
            {
                path: 'order',
                component: OrderComponent,
            },
            {
                path: 'deliver-times',
                component: DeliverTimesComponent,
            },
            {
                path: 'report',
                component: ReportComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'report-shipper',
                        pathMatch: 'full',
                    },
                    {
                        path: 'report-shipper',
                        component: ReportShipperComponent,
                    },
                    {
                        path: 'report-delivery',
                        component: ReportDeliveryComponent,
                    },
                ]
            },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DeliveryRoutingModule {
}
