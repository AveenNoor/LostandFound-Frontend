import { Component,OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { NotificationsComponent } from '../notifications/notifications.component';
import {Router } from '@angular/router';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Properties
  count:any;
  imageData:any;
  useObject :any={
    name:'',
    photoUrl:''
  };

  //Constructor
  constructor(private apiCall:UserApiCallsService,private router:Router, private dialog:MatDialog){}

  //Initializer
  ngOnInit(): void {
    this.totalNotifications();
    this.getUserInfoAPICall();
  }

  //Total user notifications
  totalNotifications(): void {
    this.apiCall.getUserItems().subscribe(
      (response: any) => {
        // Extract the items that are in the values array from the response
        const itemsArray = response.$values; // Assuming $values contains the items
        // Filter items where the match array is not empty
        this.imageData = itemsArray.filter((item: any) => item.matches && item.matches.$values && item.matches.$values.length > 0);
        // Calculate the count of items with non-empty match arrays
        this.count = this.imageData.length;
        console.log('Total notifications:', this.count);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  //Get user information details of user such as profile image and username
  getUserInfoAPICall():void{
    this.apiCall.getUserAPICall().subscribe((response)=>{
      console.log('UserInfo for dashboard is..',response);
      this.useObject.name= response.name,
      this.useObject.photoUrl= response.photoUrl
    })
  }

  //Open notifcations modal
  openNotifications(){
    this.dialog.open(NotificationsComponent,{
      width:'500px',
    })
  }

  //Navigation Function
  goto(data:string){
    this.router.navigate([data]);
  }

}
