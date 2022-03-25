import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { CommonModule } from "@angular/common";
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FrontPageComponent } from './front-page/front-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AppRouterModule } from "./app.router.module";
import { LoginComponent } from "./auth-page/login/login.component";
import { WelcomePageComponent } from "./front-page/welcome-page/welcome-page.component";
import { RegisterComponent } from "./auth-page/register/register.component";
import { StudentsComponent } from "./front-page/students/students.component";
import { SingleStudentComponent } from "./front-page/students/single-student/single-student.component";
import { StudInterceptor } from "./includes/stud.interceptor";
import {ChairComponent} from "./front-page/chair/chair.component";
import {SpecializationComponent} from "./front-page/chair/specialization/specialization.component";
import {SpecFormComponent} from "./front-page/chair/spec-form/spec-form.component";
import {FiltersComponent} from "./front-page/students/filters/filters.component";

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    AuthPageComponent,
    LoginComponent,
    RegisterComponent,
    WelcomePageComponent,
    StudentsComponent,
    SingleStudentComponent,
    ChairComponent,
    SpecializationComponent,
    SpecFormComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', <SwRegistrationOptions>{
        enabled: environment.production,
        registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule,
    AppRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: StudInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
