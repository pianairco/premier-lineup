import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "@lineup-app/shared/module/material.module";
import {AngularResizedEventModule} from "angular-resize-event";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {MatFileUploadModule} from "mat-file-upload";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AngularResizedEventModule,
    // MatFileUploadModule,
  ],
  exports: [
    // vendor
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    AngularResizedEventModule,
    TranslateModule,
    // MatFileUploadModule,
  ]
})
export class SharedModule { }
