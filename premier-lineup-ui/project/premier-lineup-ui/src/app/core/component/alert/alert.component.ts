import {AfterViewInit, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationModel} from "@lineup-app/core/service/notification.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, AfterViewInit {

  message = '';
  /*constructor(
    public snackBarRef: MatSnackBarRef<AlertComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data.duration)
    this.message = data.message;
  }*/

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationModel) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
