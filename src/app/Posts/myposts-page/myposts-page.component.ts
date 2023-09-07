import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';
import { PostIdCommuicationService } from 'src/app/services/post-id-commuication.service';

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
  useObject :any={
    name:'',
    photoUrl:''
  };

  //Constructor
   constructor(private router: Router,private jwtService: JwtserviceService, private apiCall:UserApiCallsService,private siblingComm:PostIdCommuicationService){
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
    this.getUserInfoAPICall();
  }

  //Function to get current user data
  //Get user information details 
  getUserInfoAPICall():void{
    this.apiCall.getUserAPICall().subscribe((response)=>{
      console.log('UserInfo for dashboard is..',response);
      this.useObject.name= response.name,
      this.useObject.photoUrl= response.photoUrl
    })
  }

  //Send itemID to sibling postdetailspage and then navigate to it
  viewPostDeatils(data:string,id:number):void {
    //Sending post ID to service
    const ID =id.toString()
    this.siblingComm.sendpostID(ID);
    console.log('Sent data:',ID);
    this.router.navigate([data]);
  }

   //Navigation Function
   goto(data:string){
    this.router.navigate([data]);
  }

}
