import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {config} from './APIConfigs';

@Injectable({
  providedIn: 'root'
})

export class UserApiCallsService {

  //Constructors
  constructor(private http:HttpClient) { }

  //Get user data call + JwtToken for authorization in Header*
  getUserAPICall() {
    return this.http.get<any>('https://exceedinternal.azurewebsites.net/api/User/GetUser');
  }

  //Get user data by ID
  getUserByIdAPICall(userId:string) {
    const url = `${config.testApi_URL}/users/${userId}`;
    return this.http.get(url);
  }

  //Update user profile 
  updateUserAPICall(data:any){
    return this.http.put('https://exceedinternal.azurewebsites.net/api/User/UpdateUser',data);
  }

  //Post user data call
  postUserAPICall(data:any){
    //return this.http.post('https://exceedinternal.azurewebsites.net/api/Items', data);
    return this.http.post('https://exceedinternal.azurewebsites.net/api/Items',data);
  }

  //Update user data by ID call
  // updateUserAPICall(userId:string, updatedUserData:any) {
  //   const url = `${config.testApi_URL}/users/${userId}`;
  //   return this.http.put(url, updatedUserData);
  // }

  //Get user items
  getUserItems() {
    return this.http.get<any>('https://exceedinternal.azurewebsites.net/api/Items/GetUserItems');
  }
  
  

}
