import { Component, OnInit } from '@angular/core';
import {GroupService} from "@lineup-app/view/group/service/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.css']
})
export class MemberGroupsComponent implements OnInit {
  groups = [];

  constructor(
    private router: Router,
    public groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getMemberGroups().then(res => {
      this.groups = res;
      console.log(this.groups)
    })
  }

  enter(uuid) {
  // , { queryParams: { uuid: uuid }}
    this.router.navigate(['/root/authenticated/group/panel/' + uuid]);
  }

}
