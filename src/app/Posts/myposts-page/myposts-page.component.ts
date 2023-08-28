import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';

@Component({
  selector: 'app-myposts-page',
  templateUrl: './myposts-page.component.html',
  styleUrls: ['./myposts-page.component.css']
})
export class MypostsPageComponent implements OnInit {

  //Properties
  tokenSubscription?: Subscription;
  myItemsdata : any ;
  imageData: any[] = [];
  posts = [
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' }
  ];
  


  //Constructor
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
    this.apiCall.getUserItems().subscribe(response=>{
      this.imageData = response;
      console.log("user items data",response)
    })
  }

  //Function to go to profile
  gotoProfile() : void{
  console.log('Going to my profile page....');
  this.router.navigate(['/myprofilepage']);
  }

  //Function to go to post details
  gotoPostDetails() : void{
    console.log('Going to post details page....');
    this.router.navigate(['/postdetailspage']);
  }

}
