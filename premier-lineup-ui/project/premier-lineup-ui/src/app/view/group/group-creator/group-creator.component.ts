import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GroupService} from "@lineup-app/view/group/service/group.service";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-group-creator',
  templateUrl: './group-creator.component.html',
  styleUrls: ['./group-creator.component.css']
})
export class GroupCreatorComponent implements OnInit {
  form;
  sharedLink: string = null;
  id: number = null;

  constructor(private builder: FormBuilder,
              private clipboard: Clipboard,
              private groupService: GroupService) {
    this.form = this.builder.group({
      name: ""
    });
  }

  ngOnInit(): void {
  }

  register() {
    this.groupService.create(this.form.get("name").value).then(res => {
      this.id = res;
    });
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
