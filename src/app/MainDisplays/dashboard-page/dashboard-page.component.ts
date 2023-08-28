import { Component } from '@angular/core';
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

  //constructor
  constructor(private router: Router,private jwtService: JwtserviceService, private apiCall:UserApiCallsService){
  }

  ngOnInit(): void {
    //Code for subscribing to service to get username and ID from jwt token
    this.tokenSubscription = this.jwtService.getDecodedToken().subscribe(
      (tokenData) => {
        console.log(tokenData);
      },
      (error) => {
        console.error('Error fetching token:', error);
      }
    );

    //Get current users data
    this.apiCall.getUserAPICall().subscribe((response)=>{
      console.log("user response data",response)
    })
  }

  //Function to go to profile
  gotoProfile() : void{
    console.log('Going to my profile page....');
    this.router.navigate(['/myprofilepage']);
  }

  //Function to go to my posts
  gotomyPosts():void{
    console.log('Going to my posts page....');
    this.router.navigate(['/mypostspage']);
  }

  //Function to go to product description
  goToDetails() : void {
    console.log('Going to my profile page....');
    this.router.navigate(['/myprofilepage']);
  }

  //Function to go to new post page
  gotoNewPost() : void{
    console.log('Going to create new post page....');
    this.router.navigate(['/newpostpage']);
  }

  //Toggle heart
  toggleHeart():void {
    this.isHeartToggled = !this.isHeartToggled;
  }

  //Toggle save
  toggleSave():void {
    this.isSaveToggled = !this.isSaveToggled;
  }

  //Go to post details page
  gotoPostDetails():void{
    console.log('Going to post details page...');
    this.router.navigate(['/postdetailspage']);
  }
}
