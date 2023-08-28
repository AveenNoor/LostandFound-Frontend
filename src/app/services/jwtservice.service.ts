import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtserviceService {

  constructor() { }

  // Service for decoding jwt token and providing it to all the subscribers
  getDecodedToken(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwt_decode(token);
      return of(decodedToken);
    } else {
      return of(null);
    }
  }
}
