import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMyLocationService {

  constructor() { }

  getLocation(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response =>{
        resolve({long:response.coords.longitude , lat:response.coords.latitude});
        reject('Location not gotten...');
      })
    })
  }
}
