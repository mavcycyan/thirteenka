import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {MaterializeService} from "../includes/materialize.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router,
              private cookies: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token = this.cookies.get('user_token');

    const isAuth = (token && token !== '') ? true : false;
    if (!isAuth) {
        this.router.navigate(['login']);
        MaterializeService.toast('Session expired', 'red');
        MaterializeService.toast('Please, re-enter your authorization data');
    }
    return isAuth;
  }
  
}
