import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import {AvatarComponent} from "@lineup-app/view/setting/avatar/avatar.component";

const routes: Routes = [{ path: '', component: SettingComponent, children: [
    { path: 'avatar', component: AvatarComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
