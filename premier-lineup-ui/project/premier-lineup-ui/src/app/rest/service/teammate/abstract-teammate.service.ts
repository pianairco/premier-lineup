import {Observable} from "rxjs";

export abstract class AbstractTeammateService {
  public abstract getTeammates(): Observable<Teammate[]>;
}


export interface Teammate {
  firstName: string;
  lastName: string;
  avatar: string;
  number: number;
  alias: string;
}
