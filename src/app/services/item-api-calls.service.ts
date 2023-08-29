import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {config} from './APIConfigs';

@Injectable({
  providedIn: 'root'
})

export class ItemApiCallsService {

    ///Constructors
  constructor(private http:HttpClient) { }

  //Get all items call 
  getItemsAPICall() {
    return this.http.get('https://exceedinternal.azurewebsites.net/api/User');
  }
  
  //Get lost items call 

  //Get found items call 

  //Get item by ID call
  getItemsByIdAPICall(userId:string) {
    const url = `${config.testApi_URL}/users/${userId}`;
    return this.http.get(url);
  }

  //Post item by ID call
  postUserAPICall(data:any){
    return this.http.post('https://exceedinternal.azurewebsites.net/api/Items', data);
  }

  //Update ietm data by ID call
  updateUserAPICall(userId:string, updatedUserData:any) {
    const url = `${config.testApi_URL}/users/${userId}`;
    return this.http.put(url, updatedUserData);
  }

  //Get user items
  getUserItems() {
    return this.http.get<any>('https://exceedinternal.azurewebsites.net/api/Items/GetUserItems');
  }
}
