import {Injectable} from '@angular/core';
import axios from "axios";
import {PianaStorageService} from "./piana-storage.service";
import {LoadingService} from "./loading.service";
import {ConstantService} from "./constant.service";
import {BehaviorSubject, Observable} from "rxjs";
import {EditModeObject} from "./share-state.service";
import {GeneralStateService} from "./general-state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertComponent} from "@lineup-app/core/component/alert/alert.component";
import {NotificationService} from "@lineup-app/core/service/notification.service";
import {MenuService} from "@lineup-app/core/service/menu-service.service";
// import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";

const googleLoginOptions = {
  scope: 'profile email',
  prompt: 'select_account'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  uuid = null;
  private _authSubject: any;
  private _appInfo: AppInfo = null;
  private _avatar = 'api/modules/basic-info/avatar';
  private _avatarSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._avatar);

  private _uuid: string = null;

  private setAppInfo(appInfo: AppInfo) {
    this._appInfo = appInfo;
    console.log(this._appInfo)
    this._authSubject.next(this._appInfo)
  }

  private newAvatar() {
    this._avatarSubject.next(this._avatar + '?time=' + new Date().getMilliseconds());
  }

  public $avatar(): Observable<string> {
    return this._avatarSubject.asObservable();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    /*private authService: SocialAuthService,*/
    private notificationService: NotificationService,
    private constantService: ConstantService,
    private loadingService: LoadingService,
    private menuService: MenuService,
    private generalStateService: GeneralStateService,
    private pianaStorageService: PianaStorageService,
    private _snackBar: MatSnackBar) {
    this._appInfo = new AppInfo(
      false, null, null, false, false);
    this._authSubject = new BehaviorSubject<any>(this._appInfo);
  }

  get authSubject(): Observable<AppInfo> {
    return this._authSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this._appInfo.isLoggedIn;
  }

  isAdmin(): boolean {
    return this._appInfo.isAdmin;
  }

  async initialToSignIn() {
    try {
      /*let res = await axios.post('api/sign-in/sub-domain', {}, {headers: {"content-type": "application/json"}});
      this.uuid = res.data['uuid'];
      return res.data['redirect'];*/
    } catch(err) {
      console.log(err)
    }
  }

  async getAppInfo() {
    let res = await axios.post('api/modules/auth/app-info', {}, {headers: {}});
    if (res.status === 200 && res['data']['code'] == 0) {
      this.setAppInfo(res['data']['data']);
    }
  }

  async requestOtp(loginInfo) {
    try {
      let res = await axios.post(this.constantService.getRemoteServer() + '/api/modules/auth/request-otp',
        loginInfo,
        { headers: { 'Content-Type': 'APPLICATION/JSON; charset=utf-8' } });
      // console.log(res);
      if(res['data']['code'] === 0) {
        this._uuid = res['data']['data']['uuid'];
        console.log(this._uuid)
        return true;
      } else {
        return false;
      }
      // this.pianaStorageService.putObject('appInfo', this._appInfo);

    } catch (err) {
      return false;
    }
  }

  async confirmOtp(otp) {
    try {
      let res = await axios.post(this.constantService.getRemoteServer() + '/api/modules/auth/confirm-otp',
        { type: 'otp', uuid: this._uuid, otp: otp },
        { headers: { 'Content-Type': 'APPLICATION/JSON; charset=utf-8' } });
      console.log(res);
      if(res['data']['code'] === 0) {
        this.setAppInfo(res['data']['data']);
        await this.menuService.getMenu();
        return true;
      } else {
        return false;
      }
      // this.pianaStorageService.putObject('appInfo', this._appInfo);
    } catch (err) {
      this._uuid = '';
      return false;
    }
  }

  async login(loginInfo) {
    try {
      let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
      let res = await axios.post(this.constantService.getRemoteServer() + '/api/modules/auth/login',
        loginInfo,
        { headers: { 'Content-Type': 'APPLICATION/JSON' } });
      if(res['data']['code'] == 0) {
        this.setAppInfo(res['data']['data']);
        this.newAvatar();
        await this.menuService.getMenu();
        if(returnUrl) {
          this.router.navigate([atob(returnUrl)]);
        } else {
          this.router.navigate(['/root/home']);
        }
        return true;
      } else {
        this.notificationService.changeMessage("error", "not work")
        /*this._snackBar.open("error", "close", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 1000
        });*/
        /*this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          data: {
            duration: 4000,
            message: "throw exception"
          }
        });*/
        return false;
      }
    } catch (err) {
      if(err['response']['status'] == 403)
        this.notificationService.changeMessage("error", "دسترسی غیر مجاز")
      /*this._snackBar.openFromComponent(AlertComponent, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: {
          message: "throw exception"
        }
      });
      console.log(err)*/
      return false;
    }
  }

  async logout() {
    console.log("auth service logout")
    // remove user from local storage to log user out
    try {
      // let appInfo = this.pianaStorageService.getObject('appInfo');
      if(!this._appInfo.isLoggedIn)
        return;
      let res = await axios.post(this.constantService.getRemoteServer() + 'api/modules/auth/logout', {headers: {}});
      if(res.status == 200 && res['data']['code'] == 0) {
        console.log("logout success");
        this.setAppInfo(res['data']['data']);
        this.newAvatar();
        await this.menuService.getMenu();
        this.router.navigate([this.route.snapshot['_routerState'].url]);
        this.generalStateService.title = '';
        // this.setAppInfo(new AppInfo(null, null, null, false, false));
        // this.pianaStorageService.putObject('appInfo', res['data']);
        // localStorage.removeItem('currentUser');
      }
    } catch (err) {
      // this.timeStamp = this.timeStamp + 1;
      throw err;
    }
  }

  async setAvatar(imageBase64: string, rotate: number) {
    /*let formData = new FormData();
    formData.append('file', this.imgBase64Path);
    let headers = {
      'image_upload_group': 'avatar',
      'image-upload-rotation': this.rotate,
      'Content-Type': 'multipart/form-data; boundary {}',
      'enctype': 'multipart/form-data'
    };*/
    try {
      let headers = {
        'image_upload_group': 'avatar',
        'image-upload-rotation': rotate,
        'Content-Type': 'application/json'
      };

      let res = await axios.post(this.constantService.getRemoteServer() + 'api/upload-manager/serve', {file: imageBase64}, {
        headers: headers
      });

      if (res['status'] == 200 && res['data']['code'] == 0) {
        this.newAvatar();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}

export class SiteInfo {
  title: string;
  description: string;
  tipTitle: string;
  tipDescription: string;
  headerImage: string;
  instagramLink: string;
  whatsappLink: string;
  facebookLink: string;
  telNumber: string;
}

export class AppInfo {
  username: string;
  email: string;
  pictureUrl: string;
  isLoggedIn: boolean;
  isFormPassword: boolean;
  isAdmin: boolean;
  siteInfo: SiteInfo;

  constructor(username, email, pictureUrl, isLoggedIn, isAdmin) {
    this.username = username;
    this.email = email;
    this.pictureUrl = pictureUrl;
    this.isLoggedIn = isLoggedIn;
    this.isAdmin = isAdmin;
  }
}
