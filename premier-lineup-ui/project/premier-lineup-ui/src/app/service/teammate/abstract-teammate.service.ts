export abstract class AbstractTeammateService {
  public abstract getTeammates(): Teammate[];
}


export interface Teammate {
  firstName: string;
  lastName: string;
  avatar: string;
  number: number;
  alias: string;
}
