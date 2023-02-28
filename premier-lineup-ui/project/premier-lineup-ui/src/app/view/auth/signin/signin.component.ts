import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder, FormControl} from '@angular/forms';
import {AjaxCallService} from '@lineup-app/core/service/ajax-call.service';
import {PianaStorageService} from '@lineup-app/core/service/piana-storage.service';
import {LoadingService} from '@lineup-app/core/service/loading.service';
import {ConstantService} from '@lineup-app/core/service/constant.service';
import {AuthenticationService} from '@lineup-app/core/service/authentication-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import axios from 'axios';
import {AlertComponent} from "@lineup-app/core/component/alert/alert.component";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  showModal: boolean = true;
  hide = true;
  wait = false;
  // @ts-ignore
  selected: Selectable;
  myControl = new FormControl();
// @ts-ignore
  loginInfo: {
    username: '',
    mobile: '',
    password: '',
    captcha: '',
    accessToken: ''
  } = {
    mobile: '',
    password: '',
    captcha: '',
    accessToken: ''
  };
  form;
  captchaCounter: number = 0;
  // @ts-ignore
  returnUrl: string;
  subDomain = null;

  constructor(
    public dialog: MatDialog,
    private builder: FormBuilder,
    private ajaxCall: AjaxCallService,
    private pianaStorageService: PianaStorageService,
    private loadingService: LoadingService,
    private constantService: ConstantService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {

    this.form = this.builder.group({
      username: [this.loginInfo.username],
      mobile: [this.loginInfo.mobile],
      password: [this.loginInfo.password],
      captcha: [this.loginInfo.captcha]
    });

    // this.route.queryParams.subscribe(params => {
    //   console.log("--------- param -----------")
    //   this.subDomain = params['sub-domain'];
    //   console.log("param change: ", this.subDomain)
    // });
  }

  toJsonString(obj) {
    return JSON.stringify(obj);
  }

  ngOnInit(): void {

    // this.filteredSubject.subscribe(res => {
    //   console.log(res)
    //   this.selected = res[0];
    // })

    this.myControl.valueChanges.subscribe(res =>{
      console.log(res)
      // this.filteredSubject.next(this._filter(res));
    });

    /*this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log("-")
        return this._filter(value)
      })
    ).subscribe(res => {
      console.log("+")
      this.filteredSubject.next(res);
    });*/

    console.log("on login component init", this.subDomain)
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.subDomain = this.route.snapshot.queryParams['sub-domain'];
    //   console.log("--------- param -----------")
    console.log(this.subDomain, this.returnUrl)
    /*this.loginInfo = {
      mobile: '',
      password: '',
      captcha: '',
      accessToken: ''
    }*/

    axios.get('resources/captcha', { headers: { withCredentials: true } })
      .then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  renewCaptcha() {
    this.captchaCounter++;
  }

  public displayFn(obj) {
    console.log(obj)
    if(obj)
      return obj['title'];
    return '';
  }

  public getLinkPicture() {
    return 'resources/captcha' + '?' + this.captchaCounter;
  }

  requestOtp() {
    this.loginInfo.username = this.form.get("username").value;
    this.loginInfo.mobile = this.form.get("mobile").value;
    this.loginInfo.password = this.form.get("password").value;
    this.loginInfo.captcha = this.form.get("captcha").value;
    console.log(this.loginInfo, this.form.get("mobile").value, this.form.get("password").value)
    let promise = this.authenticationService.requestOtp(this.loginInfo);
    promise.then(res => {
      if(res == true) {
        console.log("res is true")
        let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        if(returnUrl)
          this.router.navigate(['/auth/confirm'], { queryParams: { returnUrl: returnUrl}});
        else
          this.router.navigate(['/auth/confirm'])
      } else {
        console.log(res)
      }
    }, err => {
      console.log(err);
      console.log(this.myControl);
      this.captchaCounter++;
    });
    // axios.post('api/sign-in', this.loginInfo, {headers: {}})
    //   .then(res => {
    //     console.log(res);
    //   }, err => {
    //     this.timeStamp = this.timeStamp + 1;
    //     console.log(err);
    //   });
  }

  login() {
    let promise = this.authenticationService.login(this.loginInfo);
    promise.then(appInfo => {
      console.log(appInfo);
      this.router.navigate([this.returnUrl]);
    }, err => {
      console.log(this.myControl);
      this.captchaCounter++;
    });
    // axios.post('api/sign-in', this.loginInfo, {headers: {}})
    //   .then(res => {
    //     console.log(res);
    //   }, err => {
    //     this.timeStamp = this.timeStamp + 1;
    //     console.log(err);
    //   });
  }

}

export class Selectable {
  title: string;
  value: any;
}
