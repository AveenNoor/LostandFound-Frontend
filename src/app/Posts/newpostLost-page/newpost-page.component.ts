import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { GetMyLocationService } from '../../services/get-my-location.service';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-newpost-page',
  templateUrl: './newpost-page.component.html',
  styleUrls: ['./newpost-page.component.css'],
})
export class NewpostPageComponent implements OnInit {

  // Properties
  urls: string[] = [];
  itemType : string = '';
  position  ={lat:33.7119,lng:73.0578};
  markerPostion ={lat:33.7077,lng:73.0498};
  label={color:'black',text:'Marker'};
  formType : string = '';

  // New post form
  createPost: FormGroup = new FormGroup({
    postImages: new FormArray([],[]),
    postName : new FormControl('',[Validators.required]),
    postType : new FormControl('',[Validators.required]),
    postWidth : new FormControl('',[]),
    postHeight : new FormControl('',[]),
    postColor : new FormControl('',[Validators.required]),
    postDescription : new FormControl('',[Validators.required]),
    postLocation : new FormControl('',[Validators.required]),
    postTime : new FormControl(''),
    postKind : new FormControl('',[Validators.required])
  });

  //Getter functions for form controls
  get postImagesF() {
    return this.createPost.get('postImages') as FormArray;
  }

  get postNameF() {
    return this.createPost.get('postName');
  }

  get postTypeF() {
    return this.createPost.get('postType');
  }

  get postWidthF() {
    return this.createPost.get('postWidth');
  }

  get postHeightF() {
    return this.createPost.get('postHeight');
  }

  get postColorF() {
    return this.createPost.get('postColor');
  }

  get postDescriptionF() {
    return this.createPost.get('postDescription');
  }

  get postLocationF() {
    return this.createPost.get('postLocation');
  }

  get postKindF() {
    return this.createPost.get('postKind');
  }

  get postTimeF(){
    return this.createPost.get('postTime');
  }

  // Constructor
  constructor(private notification: NgToastService,private router: Router, private locationService:GetMyLocationService,private apiCall:UserApiCallsService) {}

  // OnInit function
  ngOnInit(): void {
    this.getLocation();
    this.markerPostion=this.position;
  }

   //Navigation Function
   goto(data:string){
    this.router.navigate([data]);
  }

  // Function for multiple image selection
  onSelect(e: any) {
    if (e.target.files) {
      const selectedFiles = e.target.files;
      const totalSelectedFiles = selectedFiles.length;
      if (totalSelectedFiles > 3) {
        console.log('Images exceeded...');
        alert('You can only upload up to 3 images.');
        return;
      }
      for (let i = 0; i < totalSelectedFiles; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFiles[i]);
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          // Push the image data URL to the FormArray
          this.postImagesF.push(new FormControl(event.target.result));
        };
      }
    }
  }

  //Function to get current location of the user through service subscription
  getLocation():void{
    this.locationService.getLocation().then(resolve=>{
      this.position.lat=(resolve.lat);
      this.position.lng=(resolve.long);
      console.log(resolve);
    })
  }

  //Function to set marker to the new position clicked on the map
  onMapClick(event: any):void {
    console.log("before",this.markerPostion);
    this.markerPostion = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    console.log("before",this.markerPostion);
    ///////////////////Chnage this to seperate coordinates/////////////////
    this.postLocationF?.setValue(`${this.markerPostion.lat},${this.markerPostion.lng}`);
  }

  //Function to set whether item is lost or found
  buttonSelected(type:string):void{
    this.postKindF?.setValue(type);
    this.formType=type;
    console.log('Item is:',type);
  }

  //Converting form to formdata
  getFormDataFromForm() {
    const latitude = this.markerPostion.lat.toString(); 
    const longitude = this.markerPostion.lng.toString(); 
    const formData = new FormData();
    formData.append('Name', this.postNameF?.value);
    formData.append('Description', this.postDescriptionF?.value);
    formData.append('Type', this.postKindF?.value);
    formData.append('Category',this.postTypeF?.value),
    formData.append('Color', this.postColorF?.value);
    formData.append('latitude',latitude),
    formData.append('longitude',longitude)
    for (const img of this.postImagesF.value) {
      const blob = this.dataURItoBlob(img);
      formData.append('ImageFiles', blob, 'image.png'); // Change 'image.png' to appropriate filenames
    }
    return formData;
  }

  // Function to convert data URI to Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  //On submitting fomr
  onSubmission(): void {
    this.apiCall.postUserAPICall(this.getFormDataFromForm()).subscribe(
      (response) => {
        // Handle success
        this.notification.success({ detail: 'SUCCESS', summary: 'Post Created Successfully', position: 'topCenter' });
        console.log("New post created...", response);
      },
      (error) => {
        // Handle error
        console.error("Error creating post:", error);
        // You can also show an error notification or perform any other error handling logic here.
        this.notification.error({ detail: 'ERROR', summary: 'Error Creating Post', position: 'topCenter' });
      }
    );
  }
  

}
