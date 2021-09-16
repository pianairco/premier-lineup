import {Position} from '@lineup-app/core/model/Position';

export class Formation {
  private _original: Position[];
  private _up: Position[];
  private _down: Position[];

  constructor(original: Position[], up: Position[], down: Position[]) {
    this._original = original;
    this._up = up;
    this._down = down;
  }

  get original(): Position[] {
    return this._original;
  }

  set original(value: Position[]) {
    this._original = value;
  }

  get up(): Position[] {
    return this._up;
  }

  set up(value: Position[]) {
    this._up = value;
  }

  get down(): Position[] {
    return this._down;
  }

  set down(value: Position[]) {
    this._down = value;
  }
}
