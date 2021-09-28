import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "@lineup-app/core/service/authentication-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-confirm',
  templateUrl: './forget-confirm.component.html',
  styleUrls: ['./forget-confirm.component.css']
})
export class ForgetConfirmComponent implements OnInit {
  showModal: boolean = true;
  hide = true;
  wait = false;
  form;
  confirmInfo: {
    otp: ''
  } = {
    otp: '',
  };
  constructor(private builder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.form = this.builder.group({
      otp: [this.confirmInfo.otp]
    });
  }

  ngOnInit(): void {
  }

  confirmOtp() {
    let promise = this.authenticationService.confirmForgetOtp(this.form.get("otp").value);
    promise.then(res => {
      /*if(res == true) {
        this.router.navigate(['/root/home']);
      } else {
        this.router.navigate(['/auth/sign-in']);
      }*/
    });
  }
}
