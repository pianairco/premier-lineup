import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {SharedModule} from "@lineup-app/shared/shared.module";
import { LoginComponent } from './login/login.component';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import { ConfirmComponent } from './confirm/confirm.component';
import { SigninComponent } from './signin/signin.component';
import {ForgetComponent} from "@lineup-app/view/auth/forget/forget.component";
import {ForgetConfirmComponent} from "@lineup-app/view/auth/forget-confirm/forget-confirm.component";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ConfirmComponent,
    SigninComponent,
    ForgetComponent,
    ForgetConfirmComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
