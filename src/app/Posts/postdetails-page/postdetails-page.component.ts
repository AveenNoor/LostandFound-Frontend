import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostIdCommuicationService } from 'src/app/services/post-id-commuication.service';
import { ItemApiCallsService } from 'src/app/services/item-api-calls.service';
import { GetMyLocationService } from '../../services/get-my-location.service';
import { Router } from '@angular/router';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';

@Component({
  selector: 'app-postdetails-page',
  templateUrl: './postdetails-page.component.html',
  styleUrls: ['./postdetails-page.component.css']
})
export class PostdetailsPageComponent implements OnInit {

  // Properties
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  myObject: any = {
    color: 'Not mentioned',
    description: 'Not mentioned',
    category: 'Not mentioned',
    time: 'Not mentioned',
    resolvedTime: 'Not mentioned',
    longitude: '0.000',
    latitude: '0.000',
    name: 'Not mentioned',
    username: 'Not mentioned',
    type: 'Not mentioned',
    imageUrls: { $values: ['https://exceedinternal.azurewebsites.net//images/461fafff-aa19-4842-af9d-31133283abb7.jpg'] }, // Provide a default image URL
  };
  useObject :any={
    name:'',
    photoUrl:''
  };
  myTags: string[] = [];
  position = { lat: 33.7119, lng: 73.0578 };
  markerPostion = { lat: 33.7077, lng: 73.0498 };
  label = { color: 'black', text: 'Marker' };
  observableData = '';

  // Constructor
  constructor(private apiCall:UserApiCallsService,private postIdService: PostIdCommuicationService, private cdr: ChangeDetectorRef, private apiCall1: ItemApiCallsService, private locationService: GetMyLocationService,private router:Router) {
  }

  // On initialize function
  ngOnInit(): void {
    this.postIdService.PostIDFromDisplay.subscribe((data: string) => {
      this.observableData = data;
      console.log('id is......', data);
      this.cdr.detectChanges(); // Manually trigger change detection
    });
    this.getLocation();
    this.getItemData(parseInt(this.observableData, 10)); // The second argument is the radix (base)
    this.getItemTags();
    this.markerPostion = this.position;
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

  // API Call to get tags generated for this post by AI
  getItemTags() {
    this.apiCall1.getItemtags(parseInt(this.observableData, 10)).subscribe((response: any) => {
      console.log('Tags generated are...:', response);
      if (response.$values && Array.isArray(response.$values)) {
        this.myTags = response.$values.filter((tag: any) => typeof tag === 'string');
      }
    });
  }

  // Function to get current location of the user through service subscription
  getLocation(): void {
    this.locationService.getLocation().then(resolve => {
      this.position.lat = resolve.lat;
      this.position.lng = resolve.long;
      console.log(resolve);
    });
  }

  // Function to get item details from database
  getItemData(data: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCall1.getItemsByIDCall(data).subscribe(
        (response: any) => {
          console.log('Item Details are:', response);
          this.myObject = {
            $id: response.$id,
            color: response.color || this.myObject.color,
            description: response.description || this.myObject.description,
            category: response.category || this.myObject.category,
            time: response.postedTime || this.myObject.time,
            resolvedTime: response.resolve_time || this.myObject.resolvedTime,
            longitude: response.longitude || this.myObject.longitude,
            latitude: response.latitude || this.myObject.latitude,
            name: response.name || this.myObject.name,
            username: response.username || this.myObject.username,
            type: response.type || this.myObject.type,
            imageUrls: response.imageUrls || this.myObject.imageUrls,
          };
          if ((this.myObject.latitude != null) && (this.myObject.longitude != null)) {
            this.markerPostion = {
              lat: this.myObject.latitude,
              lng: this.myObject.longitude
            };
            this.position = {
              lat: this.myObject.latitude,
              lng: this.myObject.longitude
            };
          }
          console.log('Data of item in myObject', this.myObject);
          resolve(this.myObject);
        },
        (error) => {
          console.error('Error fetching item details:', error);
          reject(error);
        }
      );
    });
  }

  //Navigation Function
  goto(data:string){
    this.router.navigate([data]);
  }
}
