import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Subscription} from "rxjs/index";
import {MaterializeService} from "../../includes/materialize.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });

  loginSub: Subscription = new Subscription();

  token: string = '';
  name: string = '';
  errors: string = '';

  constructor(
      private authService: AuthService,
      private router: Router,
      private cookies: CookieService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
      this.errors = '';
      if (this.loginForm.status !== 'INVALID') {
          this.loginSub = this.authService.login(
              this.loginForm.value.email,
              this.loginForm.value.password
          ).subscribe(
              response => {
                  this.token = response.idToken;
                  if (response.displayName && response.displayName !== '') {
                      this.name = response.displayName;
                  } else {
                      this.name = response.email.split('@')[0];
                  }
                  const helper = 0.08;
                  const exp = (response.expiresIn) ? (+response.expiresIn / 86400) + helper : 0.1; // 86400 секунд в сутках

                  this.cookies.set('user_token', this.token, {expires: exp});
                  this.cookies.set('user_name', this.name, {expires: exp});
                  this.router.navigate(['']);
                  MaterializeService.toast(`Logged in as "${this.name}"`);

              },
              error => {
                  this.errors = error.error.error.message;
                  console.log('Error: ', error);
              }
          );
      } else {
          MaterializeService.toast('Fill all required fields!', 'red')
      }
  }

  ngOnDestroy(): void {
      this.loginSub.unsubscribe();
  }

}
