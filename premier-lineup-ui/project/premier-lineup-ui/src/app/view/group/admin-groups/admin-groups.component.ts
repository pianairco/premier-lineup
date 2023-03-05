import { Component, OnInit } from '@angular/core';
import {GroupService} from "@lineup-app/view/group/service/group.service";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit {
  groups = [];

  constructor(private clipboard: Clipboard,
              public groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getAdminGroups().then(res => {
      this.groups = res;
      console.log(this.groups)
    })
  }

  nav(link) {
    console.log("nav", link)
    window.location = link;
  }

  getPublicLink(groupId) {
    //
    console.log(groupId)
    this.groupService.getPublicLink(groupId).then(res => {
      console.log(res)
      if (res['status'] == 200 && res['data']['code'] == 0) {
        this.clipboard.copy(res['data']['data']['link']);
      }
    });
  }
}
