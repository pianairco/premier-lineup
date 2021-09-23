import { Component, OnInit } from '@angular/core';
import {NotificationService} from "@lineup-app/core/service/notification.service";
import {AuthenticationService} from "@lineup-app/core/service/authentication-service.service";
import {MenuService} from "@lineup-app/core/service/menu-service.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private notificationService: NotificationService,
              public authService: AuthenticationService,
              public menuService: MenuService) { }

  ngOnInit(): void {
    this.authService.authSubject.subscribe(res => {
      console.log(res, JSON.stringify(res), res.isLoggedIn)
    })
  }
}
