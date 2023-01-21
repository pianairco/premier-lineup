import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import {LoginComponent} from "@lineup-app/view/auth/login/login.component";
import {ConfirmComponent} from "@lineup-app/view/auth/confirm/confirm.component";
import {SigninComponent} from "@lineup-app/view/auth/signin/signin.component";
import {ForgetComponent} from "@lineup-app/view/auth/forget/forget.component";
import {ForgetConfirmComponent} from "@lineup-app/view/auth/forget-confirm/forget-confirm.component";

const routes: Routes = [{ path: '', component: AuthComponent, children: [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'forget', component: ForgetComponent },
    { path: 'forget-confirm', component: ForgetConfirmComponent },
    { path: 'sign-in', component: SigninComponent },
    { path: 'confirm', component: ConfirmComponent },
    { path: 'login', component: LoginComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
