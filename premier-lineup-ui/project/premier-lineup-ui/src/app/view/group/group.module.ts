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
import {ClipboardModule} from "@angular/cdk/clipboard";
import { JoinByUuidComponent } from './join-by-uuid/join-by-uuid.component';
import { PanelComponent } from './panel/panel.component';


@NgModule({
  declarations: [
    GroupComponent,
    GroupCreatorComponent,
    GroupImageComponent,
    MemberGroupsComponent,
    AdminGroupsComponent,
    JoinByUuidComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule,
    ClipboardModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupModule { }
