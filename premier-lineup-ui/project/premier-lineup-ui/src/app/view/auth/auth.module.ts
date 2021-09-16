import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {SharedModule} from "@lineup-app/shared/shared.module";
import { LoginComponent } from './login/login.component';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [AuthComponent, LoginComponent],
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
