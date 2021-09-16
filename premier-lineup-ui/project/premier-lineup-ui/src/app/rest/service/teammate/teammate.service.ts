import { Injectable } from '@angular/core';
import {AbstractTeammateService, Teammate} from '@lineup-app/rest/service/teammate/abstract-teammate.service';
import {HttpClient} from "@angular/common/http";
import {ConstantService} from "@lineup-app/core/service/constant.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeammateService implements AbstractTeammateService {
  constructor(private httpClient: HttpClient,
              private constantService: ConstantService) { }

  getTeammates(): Observable<Teammate[]> {
    return this.httpClient.get<Teammate[]>(this.constantService.getRemoteServer() + "/api/teammate");
  }


}
