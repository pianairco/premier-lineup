import { Injectable } from '@angular/core';
import {AbstractTeammateService, Teammate} from '@lineup-app/rest/service/teammate/abstract-teammate.service';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MockTeammateService implements AbstractTeammateService {
  constructor() { }

  public getTeammates(): Observable<Teammate[]> {
    let teammates: Teammate[] = [
      { firstName: 'john1', lastName: 'doe1', avatar: 'avatar.png', number: 1, alias: 'teammate1' },
      { firstName: 'john2', lastName: 'doe2', avatar: 'avatar.png', number: 2, alias: 'teammate2' },
      { firstName: 'john3', lastName: 'doe3', avatar: 'avatar.png', number: 3, alias: 'teammate3' },
      { firstName: 'john4', lastName: 'doe4', avatar: 'avatar.png', number: 4, alias: 'teammate4' },
      { firstName: 'john5', lastName: 'doe5', avatar: 'avatar.png', number: 5, alias: 'teammate5' },
      { firstName: 'john6', lastName: 'doe6', avatar: 'avatar.png', number: 6, alias: 'teammate6' },
      { firstName: 'john7', lastName: 'doe7', avatar: 'avatar.png', number: 7, alias: 'teammate7' },
      { firstName: 'john8', lastName: 'doe8', avatar: 'avatar.png', number: 8, alias: 'teammate8' },
      { firstName: 'john9', lastName: 'doe9', avatar: 'avatar.png', number: 9, alias: 'teammate9' },
      { firstName: 'john10', lastName: 'doe10', avatar: 'avatar.png', number: 10, alias: 'teammate10' },
      { firstName: 'john11', lastName: 'doe11', avatar: 'avatar.png', number: 11, alias: 'teammate11' }
    ];
    return of(teammates);
/*    return new Observable<Teammate[]>(observer => {
      observer.next([
        { firstName: 'john1', lastName: 'doe1', avatar: 'avatar.png', number: 1, alias: 'teammate1' },
        { firstName: 'john2', lastName: 'doe2', avatar: 'avatar.png', number: 2, alias: 'teammate2' },
        { firstName: 'john3', lastName: 'doe3', avatar: 'avatar.png', number: 3, alias: 'teammate3' },
        { firstName: 'john4', lastName: 'doe4', avatar: 'avatar.png', number: 4, alias: 'teammate4' },
        { firstName: 'john5', lastName: 'doe5', avatar: 'avatar.png', number: 5, alias: 'teammate5' },
        { firstName: 'john6', lastName: 'doe6', avatar: 'avatar.png', number: 6, alias: 'teammate6' },
        { firstName: 'john7', lastName: 'doe7', avatar: 'avatar.png', number: 7, alias: 'teammate7' },
        { firstName: 'john8', lastName: 'doe8', avatar: 'avatar.png', number: 8, alias: 'teammate8' },
        { firstName: 'john9', lastName: 'doe9', avatar: 'avatar.png', number: 9, alias: 'teammate9' },
        { firstName: 'john10', lastName: 'doe10', avatar: 'avatar.png', number: 10, alias: 'teammate10' },
        { firstName: 'john11', lastName: 'doe11', avatar: 'avatar.png', number: 11, alias: 'teammate11' }
      ]);
      observer.complete();
    });*/
  }
}
