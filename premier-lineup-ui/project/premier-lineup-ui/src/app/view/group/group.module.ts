import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { GroupCreatorComponent } from './group-creator/group-creator.component';
import { GroupImageComponent } from './group-image/group-image.component';
import {GroupService} from "@lineup-app/view/group/service/group.service";
import { MemberGroupsComponent } from './member-groups/member-groups.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import {SharedModule} from "@lineup-app/shared/shared.module";


@NgModule({
  declarations: [
    GroupComponent,
    GroupCreatorComponent,
    GroupImageComponent,
    MemberGroupsComponent,
    AdminGroupsComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupModule { }
