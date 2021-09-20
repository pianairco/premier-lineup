import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { AvatarComponent } from './avatar/avatar.component';
import {SharedModule} from "@lineup-app/shared/shared.module";


@NgModule({
  declarations: [
    SettingComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
