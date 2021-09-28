import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {GroupService} from "@lineup-app/view/group/service/group.service";

@Component({
  selector: 'app-join-by-uuid',
  templateUrl: './join-by-uuid.component.html',
  styleUrls: ['./join-by-uuid.component.css']
})
export class JoinByUuidComponent implements OnInit {
  form;
  groupInfo = null;

  constructor(private groupService: GroupService,
              private builder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let uuid = this.route.snapshot.paramMap.get('uuid')
    if (!uuid)
      uuid = "";
    this.form = this.builder.group({
      uuid: new FormControl({ value: uuid, disabled: true })
    });
  }

  showDetail() {
    console.log(this.form.get("uuid").value)
    this.groupService.groupInfoByUuid(this.form.get("uuid").value).then(groupInfo => {
      if(groupInfo) {
        this.groupInfo = groupInfo;
      }
    })
  }

  join() {
    this.groupService.sendJoinRequest(this.form.get("uuid").value).then(
      res => {
      }
    );
  }

  joinCancel() {
    this.groupInfo = null;
  }
}
