import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if (this.authService.getToken()) {
            let token = this.authService.getToken();
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.getToken()}`
                }
            });
        }
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.authService.logout()
                }
            }
        });
    }
}