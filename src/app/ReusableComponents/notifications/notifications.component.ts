import { Component,OnInit } from '@angular/core';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';
import { PostIdCommuicationService } from 'src/app/services/post-id-commuication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  //Properties
  myItemsdata : any[] =[];
  imageData: any[] =[];
  useObject :any={
    name:'',
    photoUrl:''
  };

  constructor(private dialog:MatDialog,private router:Router,private apiCall:UserApiCallsService,private siblingComm:PostIdCommuicationService){
  }

  ngOnInit(): void {
    this.apiCall.getUserItems().subscribe(
      (response: any) => {
        console.log('user Item response...',response);
        // Extract the items that are in the values array from the response
        const itemsArray = response.$values; // Assuming $values contains the items
        // Filter items where the match array is not empty
        this.imageData = itemsArray.filter((item: any) => item.matches && item.matches.$values && item.matches.$values.length > 0);
        console.log('user items data', this.imageData);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }
  
  closeNotifications(){
    this.dialog.closeAll();
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
    this.dialog.closeAll();
  }

}
