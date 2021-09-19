import { Injectable } from '@angular/core';
import axios from "axios";
import {AuthenticationService} from "./authentication-service.service";
import {PianaStorageService} from "./piana-storage.service";

@Injectable({
  providedIn: 'root'
})
export class InitializerService {

  constructor(
    private pianaStorageService: PianaStorageService,
    private authenticationService: AuthenticationService) { }

  load(): Promise<any> {
    return this.authenticationService.getAppInfo();
  }
}
