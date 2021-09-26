import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GroupService} from "@lineup-app/view/group/service/group.service";

@Component({
  selector: 'app-group-creator',
  templateUrl: './group-creator.component.html',
  styleUrls: ['./group-creator.component.css']
})
export class GroupCreatorComponent implements OnInit {
  form;
  sharedLink: string = null;

  constructor(private builder: FormBuilder,
              private groupService: GroupService) {
    this.form = this.builder.group({
      name: ""
    });
  }

  ngOnInit(): void {
  }

  register() {
    this.groupService.create(this.form.get("name").value).then(res => {
      this.sharedLink = res;
    });
  }

}
