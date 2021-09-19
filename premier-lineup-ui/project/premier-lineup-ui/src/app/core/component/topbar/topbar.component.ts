import { Component, OnInit } from '@angular/core';
import {NotificationService} from "@lineup-app/core/service/notification.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  showMessage() {
    this.notificationService.changeMessage("error", "hello");
  }
}
