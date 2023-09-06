import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtserviceService {
  // Create a BehaviorSubject to store and notify subscribers of the token changes
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    // Initialize the tokenSubject with the current token from local storage
    this.tokenSubject.next(localStorage.getItem('accessToken'));
  }

  // Service for decoding jwt token and providing it to all the subscribers
  getDecodedToken(): Observable<any> {
    // Subscribe to the tokenSubject to get token updates
    return this.tokenSubject.asObservable().pipe(
      // Map the token to its decoded value
      map(token => {
        if (token) {
          return jwt_decode(token);
        } else {
          return null;
        }
      })
    );
  }

  // Method to update the token in the service and notify subscribers
  updateToken(token: string | null) {
    this.tokenSubject.next(token);
  }
}
