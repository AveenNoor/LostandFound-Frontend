import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';

@Component({
  selector: 'app-myprofilepage',
  templateUrl: './myprofilepage.component.html',
  styleUrls: ['./myprofilepage.component.css']
})

export class MyprofilepageComponent implements OnInit {

  //Properties
  tokenSubscription?: Subscription;
  myObject: any = {};

  //Constructor
  constructor(private router: Router,private jwtService: JwtserviceService, private apiCall:UserApiCallsService){
  }

  //On initialize function
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

    //Get current users profile data
    this.apiCall.getUserAPICall().subscribe(
      (response) => {
        console.log("User data is..", response);
        this.myObject = {
          userImage: response.photoUrl,
          userName: response.name,
          userPhone: response.phoneNumber,
          userCommunity: [], // Initialize an empty array
        };

        if (response.communityNames && Array.isArray(response.communityNames.$values)) {
          this.myObject.userCommunity = response.communityNames.$values;
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  //Navigation Function
  goto(data:string){
    this.router.navigate([data]);
  }

}
