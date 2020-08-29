import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
    return next.handle(req);
  }
}
