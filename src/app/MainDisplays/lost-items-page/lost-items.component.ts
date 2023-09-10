import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { ItemApiCallsService } from 'src/app/services/item-api-calls.service';
import { PostIdCommuicationService } from 'src/app/services/post-id-commuication.service';

@Component({
  selector: 'app-lost-items',
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.css']
})
export class LostItemsComponent {

   //Properties
   tokenSubscription?: Subscription;
   myObject: any = {};
   item: any;
 
   //constructor
   constructor(private router: Router,private jwtService: JwtserviceService, private apiCall1:ItemApiCallsService, private siblingComm:PostIdCommuicationService){
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
     //Function to get all found items
     this.getLostItems();
   }

   //Function to get all found items
   getLostItems(): void {
     this.apiCall1.getLostItemsAPICall().subscribe(
       (response: Record<string, any>) => { 
         console.log("found items response data", response);
         this.myObject = {
           $id: response['$id'],
           $values: response['$values'].map((item: any) => {
             return {
               $id: item.$id,
               id: item.id,
               username: item.username,
               name: item.name,
               description: item.description,
               imageUrls: item.imageUrls.$values, // Extract imageUrls
               isHeartToggled: item.likedInfo,
                isSaved:item.savedPostInfo,
                userImage:item.userProfileUrl
              };
           }),
         };
         console.log("myObject:", this.myObject);
       },
       (error) => {
         console.error("Error fetching found items:", error);
       }
     );
   }
 
  //Navigation Function
  goto(data:string){
     this.router.navigate([data]);
   }
 
  //Send itemID to sibling postdetailspage and then navigate to it
  viewPostDeatils(data:string,id:number):void {
    //Sending post ID to service
    const ID =id.toString()
    this.siblingComm.sendpostID(ID);
    console.log('Sent data:',ID);
    this.router.navigate([data]);
  }
 
  //Toggle heart
  toggleHeart(item: any): void {
    item.isHeartToggled = !item.isHeartToggled;
    if(item.isHeartToggled==true){
      const object={
        itemid:item.id
      }
      this.apiCall1.postLikedItemsAPICall(object).subscribe((response)=>{
        console.log('Posts Likes Updated....',response);
      })
    }
  }

  //Toggle save
  toggleSave(item: any): void {
    item.isSaved = !item.isSaved;
    if (item.isSaved) {
      // Save Post API Call
      const object = {
        itemid: item.id
      };
      this.apiCall1.postSavedItemsAPICall(object).subscribe((response) => {
        console.log('Saved post....', response);
      });
    } else {
      // Remove from save posts call
      this.apiCall1.removeSavedPostAPICall(item.id).subscribe((response) => {
        console.log('Saved post removed....', response);
      });
    }
  }
 
}
