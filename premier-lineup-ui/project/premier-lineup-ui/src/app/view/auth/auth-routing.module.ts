import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import {LoginComponent} from "@lineup-app/view/auth/login/login.component";
import {ConfirmComponent} from "@lineup-app/view/auth/confirm/confirm.component";
import {SigninComponent} from "@lineup-app/view/auth/signin/signin.component";

const routes: Routes = [{ path: '', component: AuthComponent, children: [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SigninComponent },
    { path: 'login', component: LoginComponent },
    { path: 'confirm', component: ConfirmComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
