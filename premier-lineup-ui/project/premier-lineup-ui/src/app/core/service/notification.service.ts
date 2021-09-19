import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {MatSnackBar, MatSnackBarDismiss} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public editDataDetails: any = null;
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.editDataDetails);

  currentMessage = this.messageSource.asObservable();

  constructor(private _snackBar: MatSnackBar) {
    setTimeout(() => {
      this.currentMessage.subscribe(res => {
        if(res) {
          this._snackBar.open(res['message'], "close", {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      })
    }, 1000)
  }

  changeMessage(type: string, message: string) {
    this.messageSource.next(new NotificationModel(type, message, true));
  }

  clear() {
    this.messageSource.next(new NotificationModel(null, null, false));
  }
}

export class NotificationModel {
  isShow: boolean;
  type: string;
  message: string;

  constructor(type: string, message: string, isShow: boolean) {
    this.isShow = isShow;
    this.type = type;
    this.message = message;
  }
}
