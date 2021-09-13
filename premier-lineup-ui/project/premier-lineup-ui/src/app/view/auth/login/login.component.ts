import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject} from "rxjs";
import {FormControl} from "@angular/forms";
import {AjaxCallService} from "@lineup-app/core/service/ajax-call.service";
import {PianaStorageService} from "@lineup-app/core/service/piana-storage.service";
import {LoadingService} from "@lineup-app/core/service/loading.service";
import {ConstantService} from "@lineup-app/core/service/constant.service";
import {AuthenticationService} from "@lineup-app/core/service/authentication-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import axios from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showModal: boolean = true;
  hide = true;
  wait = false;
  // @ts-ignore
  selected: Selectable;
  public _funds: Selectable[] = [];
  fundSubject: BehaviorSubject<Selectable[]> = new BehaviorSubject<Selectable[]>(this._funds);
  filteredSubject: BehaviorSubject<Selectable[]> = new BehaviorSubject<Selectable[]>(this._funds);
  myControl = new FormControl();
// @ts-ignore
  fund: '';
// @ts-ignore
  loginInfo: {
    username: '',
    password: '',
    captcha: '',
    accessToken: ''
  }
  captchaCounter: number = 0;
  // @ts-ignore
  returnUrl: string;
  subDomain = null;

  constructor(
    private ajaxCall: AjaxCallService,
    private pianaStorageService: PianaStorageService,
    private loadingService: LoadingService,
    private constantService: ConstantService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.ajaxCall.read("api/modules/general/fund/list")
      .then(res => {
        console.log(res);
        if(res.status == 200) {
          this._funds = res.data;
          this.fundSubject.next(this._filter(''));
          // this.fundSubject.next(res.data);
        }
      });
    // this.route.queryParams.subscribe(params => {
    //   console.log("--------- param -----------")
    //   this.subDomain = params['sub-domain'];
    //   console.log("param change: ", this.subDomain)
    // });
  }

  ngOnInit(): void {
    this.fundSubject.subscribe(res => {
      // console.log(res)
      if(res.length > 1) {
        console.log(res)
        // @ts-ignore
        // this.filteredSubject.next(this._filter(''));
      }
    });

    // this.filteredSubject.subscribe(res => {
    //   console.log(res)
    //   this.selected = res[0];
    // })

    this.myControl.valueChanges.subscribe(res =>{
      console.log(res)
      this.fundSubject.next(this._filter(res));
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
    this.loginInfo = {
      username: '',
      password: '',
      captcha: '',
      accessToken: ''
    }

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

  private _filter(value: any): Selectable[] {
    console.log(value)
    let filterValue = null;
    if(value instanceof Selectable) {
      filterValue = value['title'].toLowerCase();
    } else if (value && value.length > 0) {
      filterValue = value.toLocaleLowerCase();
    }
    console.log()
    if(filterValue) {
      console.log(filterValue);
      return this._funds.filter(option => option.title.substr(19)
        .toLowerCase().indexOf(filterValue) >= 0);
    }
    return this._funds;
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

  fundChange(event) {
    if(event instanceof Object && event['value']) {
      this.fund = event['value'];
    } else {
      this.fund = '';
    }
  }

  login() {
    if(!this.fund) {
      alert("صندوق به درستی انتخاب نشده")
    }
    let promise = this.authenticationService.login(this.loginInfo, this.fund);
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
