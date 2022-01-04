import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

import { FrontPageComponent } from "./front-page/front-page.component";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { WelcomePageComponent } from "./front-page/welcome-page/welcome-page.component";
import { ChairComponent } from "./front-page/chair/chair.component";
import { StudentsComponent } from "./front-page/students/students.component";
import { AuthGuardGuard } from "./auth-page/auth-guard.guard";
import { LoginComponent } from "./auth-page/login/login.component";
import { RegisterComponent } from "./auth-page/register/register.component";
import {SingleStudentComponent} from "./front-page/students/single-student/single-student.component";

const routes: Routes = [
    {
        path: '', component: FrontPageComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: WelcomePageComponent},
            {path: 'chairs', component: ChairComponent},
            {path: 'students', component: StudentsComponent},
            {path: 'students/add', component: SingleStudentComponent},
            {path: 'students/edit/:id', component: SingleStudentComponent}
        ]
    },
    {
        path: '', component: AuthPageComponent, children: [
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})

export class AppRouterModule {}