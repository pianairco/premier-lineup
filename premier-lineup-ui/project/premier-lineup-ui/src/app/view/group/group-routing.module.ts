import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupComponent} from './group.component';
import {GroupImageComponent} from "@lineup-app/view/group/group-image/group-image.component";
import {GroupCreatorComponent} from "@lineup-app/view/group/group-creator/group-creator.component";
import {AdminGroupsComponent} from "@lineup-app/view/group/admin-groups/admin-groups.component";
import {MemberGroupsComponent} from "@lineup-app/view/group/member-groups/member-groups.component";

const routes: Routes = [
  { path: '', component: GroupComponent, children: [
      { path: 'image', component: GroupImageComponent },
      { path: 'create', component: GroupCreatorComponent },
      { path: 'admin-groups', component: AdminGroupsComponent },
      { path: 'member-groups', component: MemberGroupsComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
