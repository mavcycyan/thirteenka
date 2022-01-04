import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class StudInterceptor implements HttpInterceptor{
    constructor(private cookies: CookieService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const str = this.cookies.get('user_token');
        const clonedReq = req.clone({
            params: req.params.set('auth', str)
        });
        return next.handle(clonedReq);
    }
}
