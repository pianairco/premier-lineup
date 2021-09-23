import { Injectable } from '@angular/core';
import axios from "axios";
import {AuthenticationService} from "./authentication-service.service";
import {PianaStorageService} from "./piana-storage.service";
import {MenuService} from "@lineup-app/core/service/menu-service.service";

@Injectable({
  providedIn: 'root'
})
export class InitializerService {

  constructor(
    private pianaStorageService: PianaStorageService,
    private authenticationService: AuthenticationService,
    private menuService: MenuService) { }

  load(): Promise<any> {
    let appInfo = this.authenticationService.getAppInfo();
    this.menuService.getMenu();
    return appInfo;
  }
}
