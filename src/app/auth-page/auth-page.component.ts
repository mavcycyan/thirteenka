import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

    isLogin: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

    checkPage(str: string): void {
      this.isLogin = (str === 'login') ? true : false;
    }

}
