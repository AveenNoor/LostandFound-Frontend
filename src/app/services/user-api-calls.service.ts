import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {config} from './APIConfigs';

@Injectable({
  providedIn: 'root'
})

export class UserApiCallsService {

  //Constructors
  constructor(private http:HttpClient) { }

  //Get current user data::For founditemspage,lostitemsPage,editprofilePage,myprofilePage%
  getUserAPICall() {
    return this.http.get<any>('https://exceedinternal.azurewebsites.net/api/User/GetUser');
  }
  
  //Post new user API call::For otpverifyPage%
  postNewUserAPICall(data:any){
    return this.http.post('https://exceedinternal.azurewebsites.net/api/User/UserSignup',data);
  }

  //Update user profile::For editprofilePage%
  updateUserAPICall(data:any){
    return this.http.put('https://exceedinternal.azurewebsites.net/api/User/UpdateUser',data);
  }

  //Post new item::For newpostPage%
  postUserAPICall(data:any){
    return this.http.post('https://exceedinternal.azurewebsites.net/api/Items',data);
  }

  //Get user items::For mypostsPage%
  getUserItems() {
    return this.http.get<any>('https://exceedinternal.azurewebsites.net/api/Items/GetUserItems');
  }

}
