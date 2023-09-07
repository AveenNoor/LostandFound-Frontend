import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  // Constructor
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Interceptor which will add a JWT token as a header to every request
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.authService.getToken();
    if (jwtToken) {
      // Check token expiration
      const isTokenExpired = this.authService.isTokenExpired();

      if (!isTokenExpired) {
        // Token is not expired; attach it to the request
        request = request.clone({
          setHeaders: {
            // Add any more data that you need to send in every header
            Authorization: `Bearer ${jwtToken}`
          }
        });
      } else {
        // Token is expired; redirect to login page
        this.authService.logout(); // Implement a logout method in your authentication service
        this.router.navigate(['/login']); // Redirect to the login page
        // You might also refresh the token here if your backend supports it
      }
    }
    console.log(request);
    return next.handle(request);
  }
}















// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class HeadersInterceptor implements HttpInterceptor {

//   //Constructor
//   constructor() {}

//   //Interceptor which will add a jwt token as a header to every 
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const jwtToken: any = localStorage.getItem('accessToken');
//     if (jwtToken) {
//       request = request.clone({
//         setHeaders: {
//           //Add any more data that you need to send in every header
//           Authorization: `Bearer ${jwtToken}`
//         }
//       });
//     }
//     console.log(request);
//     return next.handle(request);
//   }
// }
