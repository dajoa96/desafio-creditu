import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
export const InterceptorSkip = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly userService: UserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers && !request.headers.has(InterceptorSkip) && this.userService.checkToken()) {    //We check that if the headers contains the interceptorSkip, then nothing will ocurr. Aditionally we check the JWT if it's expired the app will logout the user
      const token = localStorage.getItem('app-token');                                                  //We get the token
      if (token && token !== '') {                                                                      //We also check the token is not empty, this is required to avoid errors with the clone method
        request = request.clone({
          setHeaders: {
            authorization: token                                                                        //We set the Authorization header with our JWT
          }
        });
      };
    }
    return next.handle(request);
  }
}
