import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from './../../@theme/theme.module';
import { AuthenRoutingModule } from './authen.routing';
import { AuthenComponent } from './authen.component';
import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbRadioModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';


import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestPasswordComponent } from './request-password/request-password.component';

@NgModule({
    imports: [
        ThemeModule,
        NbMenuModule,
        FormsModule,
        NbInputModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NbCardModule,
        NbLayoutModule,
        NbSpinnerModule,
        NbSelectModule,
        NbRadioModule,
        NbIconModule,
        AuthenRoutingModule
    ],
    declarations: [
        AuthenComponent,
        LoginComponent,
        RequestPasswordComponent,
    ],
})
export class AuthenModule {
}
