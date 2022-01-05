import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor(
      private cookies: CookieService,
      private router: Router
      ) { }

  ngOnInit(): void {
  }

  logOut(): void {
      this.cookies.delete('user_name');
      this.cookies.delete('user_token');
      this.router.navigate(['login']);
  }

}
