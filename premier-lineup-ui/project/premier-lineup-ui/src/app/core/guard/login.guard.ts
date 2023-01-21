import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "@lineup-app/core/service/authentication-service.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn = this.authenticationService.isLoggedIn();
    isLoggedIn = true;
    // console.log(appInfo);
    if (isLoggedIn === true) {
       return true;
    } else {
       this.router.navigate(['/auth/login'], { queryParams: { returnUrl: btoa(state.url) }});
       return false;
    }
  }

}
