export class Position {
  private _postNumber: number;
  private _x: number;
  private _y: number;

  constructor(_postNumber: number, x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get postNumber(): number {
    return this._postNumber;
  }

  set postNumber(value: number) {
    this._postNumber = value;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}
