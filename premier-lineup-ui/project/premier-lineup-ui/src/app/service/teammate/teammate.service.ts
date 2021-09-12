import { Injectable } from '@angular/core';
import {AbstractTeammateService, Teammate} from '@lineup-app/service/teammate/abstract-teammate.service';

@Injectable({
  providedIn: 'root'
})
export class TeammateService implements AbstractTeammateService {
  constructor() { }

  getTeammates(): Teammate[] {
    return [];
  }


}
