import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  public user = this.cookies.get('user_name');
  public token = this.cookies.get('user_token');

  constructor(private cookies: CookieService) { }
}
