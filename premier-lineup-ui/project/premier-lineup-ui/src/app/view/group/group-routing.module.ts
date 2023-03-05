import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupComponent} from './group.component';
import {GroupImageComponent} from "@lineup-app/view/group/group-image/group-image.component";
import {GroupCreatorComponent} from "@lineup-app/view/group/group-creator/group-creator.component";
import {AdminGroupsComponent} from "@lineup-app/view/group/admin-groups/admin-groups.component";
import {MemberGroupsComponent} from "@lineup-app/view/group/member-groups/member-groups.component";
import {JoinByUuidComponent} from "@lineup-app/view/group/join-by-uuid/join-by-uuid.component";
import {PanelComponent} from "@lineup-app/view/group/panel/panel.component";

const routes: Routes = [
  { path: '', component: GroupComponent, children: [
      { path: 'image', component: GroupImageComponent },
      { path: 'create', component: GroupCreatorComponent },
      { path: 'admin-groups', component: AdminGroupsComponent },
      { path: 'member-groups', component: MemberGroupsComponent },
      { path: 'panel/:uuid', component: PanelComponent },
      { path: 'join-by-uuid/:uuid', component: JoinByUuidComponent },
      { path: 'join-by-uuid', component: JoinByUuidComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
