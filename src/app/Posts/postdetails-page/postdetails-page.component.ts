import { Component } from '@angular/core';

@Component({
  selector: 'app-postdetails-page',
  templateUrl: './postdetails-page.component.html',
  styleUrls: ['./postdetails-page.component.css']
})
export class PostdetailsPageComponent {

  //Properties
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  position  ={lat:33.7119,lng:73.0578};
  markerPostion ={lat:33.7077,lng:73.0498};
  label={color:'black',text:'Marker'};
  
}
