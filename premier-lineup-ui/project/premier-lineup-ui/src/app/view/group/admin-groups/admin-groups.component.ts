import { Component, OnInit } from '@angular/core';
import {GroupService} from "@lineup-app/view/group/service/group.service";

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit {
  groups = [];

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getAdminGroups().then(res => {
      this.groups = res;
    })
  }

  nav(link) {
    console.log("nav", link)
    window.location = link;
  }
}
