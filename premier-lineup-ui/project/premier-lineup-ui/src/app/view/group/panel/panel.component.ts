import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "@lineup-app/view/group/service/group.service";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  uuid: string = null;
  teammates: object[] = null;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    console.log(this.uuid)
    // this.uuid = this.route.snapshot.queryParamMap.get("uuid");
    this.groupService.getMembers(this.uuid).then(res => {
      this.teammates = res;
      console.log(this.teammates)
    })
  }

}
