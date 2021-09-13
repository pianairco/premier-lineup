import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "@lineup-app/shared/module/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    // vendor
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    // material


    // local

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // vendor
    CommonModule,
    RouterModule,
    MaterialModule,
    // material


    // local
    TranslateModule
  ]
})
export class SharedModule { }
