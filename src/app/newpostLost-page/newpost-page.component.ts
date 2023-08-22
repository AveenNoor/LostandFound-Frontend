import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { GetMyLocationService } from '../services/get-my-location.service';

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
  constructor(private router: Router,private locationService:GetMyLocationService) {}

  // OnInit function
  ngOnInit(): void {
    this.getLocation();
    this.markerPostion=this.position;
  }

  // Function to navigate to the profile page
  gotoProfile(): void {
    console.log('Going to my profile page....');
    this.router.navigate(['/myprofilepage']);
  }

  // Function to navigate to the new post page
  gotoNewPost(): void {
    console.log('Going to create new post page....');
    this.router.navigate(['/newpostpage']);
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

}
