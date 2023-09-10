import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';
import { PostIdCommuicationService } from 'src/app/services/post-id-commuication.service';
import { ItemApiCallsService } from 'src/app/services/item-api-calls.service';

@Component({
  selector: 'app-saveditems-page',
  templateUrl: './saveditems-page.component.html',
  styleUrls: ['./saveditems-page.component.css']
})
export class SaveditemsPageComponent {

  //Properties
  tokenSubscription?: Subscription;
  myItemsdata : any[] =[];
  imageData: any[] =[];

  //Constructor
   constructor(private router: Router,private jwtService: JwtserviceService, private apiCall:UserApiCallsService,private apiCall1:ItemApiCallsService,private siblingComm:PostIdCommuicationService){
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
    this.apiCall1.getAllSavedPostsAPICall().subscribe((response: any) => {
      // Extract the items thats is the values array from the response
      // and then we iterate and store it in the image data array so that we can access the 
      // objects/array present inside the response.$values
      console.log(response);
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
