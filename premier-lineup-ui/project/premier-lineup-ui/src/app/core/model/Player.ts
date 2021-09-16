export interface Player {
  getImage(): string;
  getFirstName(): string;
  getLastName(): string;
  getAlias(): string;
  getNumber(): number;
}

export class UnknownPlayer implements Player {
  getImage(): string {
    // @ts-ignore
    return null;
  }

  getFirstName(): string {
    return 'unknown';
  }

  getLastName(): string {
    return 'unknown';
  }

  getAlias(): string {
    return 'unknown';
  }

  getNumber(): number {
    return 0;
  }
}
