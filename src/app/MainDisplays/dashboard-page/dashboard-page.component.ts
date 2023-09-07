import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {

  //Properties
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  productDescription: string = ' Stay in the loop with notifications, track your fitness goals, and even make payments right from your wrist. With its stylish design and advanced features, our smartwatch is the perfect blend of fashion and functionality. Elevate your lifestyle today!';
  tokenSubscription?: Subscription;
  isHeartToggled : boolean = false;
  isSaveToggled :boolean = false;
  term:any;
  useObject :any={
    name:'',
    photoUrl:''
  };

  //constructor
  constructor(private location:Location,private router: Router,private jwtService: JwtserviceService, private apiCall:UserApiCallsService){
  }

  ngOnInit(): void {
    this.tokenSubscription = this.jwtService.getDecodedToken().subscribe(
      (tokenData) => {
        console.log(tokenData);
        console.log('UserID is...',tokenData.user_id);
      },
      (error) => {
        console.error('Error fetching token:', error);
      }
    );
    this.getUserInfoAPICall();
  }

  //Get user information details 
  getUserInfoAPICall():void{
    this.apiCall.getUserAPICall().subscribe((response)=>{
      console.log('UserInfo for dashboard is..',response);
      this.useObject.name= response.name,
      this.useObject.photoUrl= response.photoUrl
    })
  }

  //Navigation Function
  goto(data:string){
    this.router.navigate([data]);
  }

  //Toggle heart
  toggleHeart():void {
    this.isHeartToggled = !this.isHeartToggled;
  }

  //Toggle save
  toggleSave():void {
    this.isSaveToggled = !this.isSaveToggled;
  }

}
