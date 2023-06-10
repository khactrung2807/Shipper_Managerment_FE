import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { MatTableModule } from '@angular/material/table';
import { DeliveryRoutingModule } from './delivery.routing';
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
    NbDatepickerModule,
    NbCheckboxModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { PlanningComponent } from './planning/planning.component';
import { OrderComponent } from './order/order.component';
import { DeliverTimesComponent } from './deliver-times/deliver-times.component';
import { ReportComponent } from './report/report.component';
import { AddorderComponent } from './order/addorder/addorder.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AdddeliverTimesComponent } from './deliver-times/adddeliver-times/adddeliver-times.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportShipperComponent } from './report/report-shipper/report-shipper.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReportDeliveryComponent } from './report/report-delivery/report-delivery.component';
import { EditdeliveryComponent } from './deliver-times/editdelivery/editdelivery.component';

@NgModule({
    imports: [
        MatTableModule,
        MatPaginatorModule,
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
        NbCheckboxModule,
        NbButtonModule,
        NbDatepickerModule.forRoot(),
        NbDatepickerModule,
        NgxEchartsModule,
        NbInputModule,
        DeliveryRoutingModule,
        NbDialogModule.forRoot(),
        MatGoogleMapsAutocompleteModule,
        AgmCoreModule,
        AgmDirectionModule
    ],
    declarations: [
        PlanningComponent,
        OrderComponent,
        DeliverTimesComponent,
        ReportComponent,
        AddorderComponent,
        AdddeliverTimesComponent,
        DashboardComponent,
        ReportShipperComponent,
        ReportDeliveryComponent,
        EditdeliveryComponent,
    ],
    entryComponents: [
        AddorderComponent,
        AdddeliverTimesComponent,
        EditdeliveryComponent
    ],
})
export class DeliveryModule { }
