import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {config} from './APIConfigs';

@Injectable({
  providedIn: 'root'
})
export class ItemApiCallsService {

    //Constructors
    constructor(private http:HttpClient) { }

    //Get user data call + JwtToken for authorization in Header
    getUserAPICall() {
      return this.http.get(config.testApi_URL);
    }
    
    //Post user data call
    postUserAPICall(data:any){
      return this.http.post('https://exceedinternal.azurewebsites.net/api/Items', data);
    }
  
    //Get user items
    getUserItems() {
      return this.http.get('https://exceedinternal.azurewebsites.net/api/Items/GetUserItems');
    }
}
