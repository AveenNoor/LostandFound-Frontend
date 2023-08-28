import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  //Constructor
  constructor() {}

  //Interceptor which will add a jwt token as a header to every 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken: any = localStorage.getItem('accessToken');
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          //Add any more data that you need to send in every header
          Authorization: `Bearer ${jwtToken}`
        }
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
