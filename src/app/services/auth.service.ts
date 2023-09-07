import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  // Assuming your JWT token has an "exp" claim for expiration
  private getTokenExpiration(): number | null {
    if (!this.token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      if (payload.exp) {
        return payload.exp * 1000; // Convert to milliseconds
      }
    } catch (error) {
      console.error('Error parsing JWT token:', error);
    }

    return null;
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (expiration) {
      const currentDateTime = new Date().getTime();
      return expiration <= currentDateTime;
    }
    return true; // If there's no expiration or an error occurred, consider it expired
  }

  setToken(token: string) {
    this.token = token;
    // Save the token to local storage
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    // Retrieve the token directly from local storage
    return localStorage.getItem('accessToken');
  }

  logout() {
    console.log('logout called');
    // Remove the token from local storage
    //localStorage.removeItem('accessToken');
    // Implement any other logout logic, e.g., clearing user data, navigating to the login page, etc.
    this.token = null;
  }
}
