import { RequestPasswordComponent } from './request-password/request-password.component';
import { LoginComponent } from './login/login.component';
import { AuthenComponent } from './authen.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '', component: AuthenComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'request-password', component: RequestPasswordComponent }
        ]
    }
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenRoutingModule {
}
