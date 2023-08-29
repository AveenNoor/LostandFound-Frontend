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
  myItemsdata : any[] =[];
  imageData: any[] =[];

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
    this.apiCall.getUserItems().subscribe((response: any) => {
      // Extract the items thats is the values array from the response
      // and then we iterate and store it in the image data array so that we can access the 
      // objects/array present inside the response.$values
      const itemsArray = response.$values; // Assuming $values contains the items
      if (Array.isArray(itemsArray)) {
        this.imageData = itemsArray;
      }
      console.log('user items data', this.imageData);
    },
    (error) => {
      console.error('Error fetching items:', error);
    });
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
