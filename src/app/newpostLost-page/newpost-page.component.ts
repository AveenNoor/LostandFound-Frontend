import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-newpost-page',
  templateUrl: './newpost-page.component.html',
  styleUrls: ['./newpost-page.component.css'],
})
export class NewpostPageComponent implements OnInit {

  // Properties
  urls: string[] = [];
  itemType : string = '';

  // New post form
  createPost: FormGroup = new FormGroup({
    postImages: new FormArray([],[Validators.required]),
    postName : new FormControl('',[Validators.required]),
    postType : new FormControl('',[Validators.required]),
    postWidth : new FormControl('',[]),
    postHeight : new FormControl('',[]),
    postColor : new FormControl('',[Validators.required]),
    postDescription : new FormControl('',[Validators.required]),
    postLocation : new FormControl('',[Validators.required])
  });

  get postImagesF() {
    return this.createPost.get('postImages') as FormArray;
  }

  // Constructor
  constructor(private router: Router) {}

  // OnInit function
  ngOnInit(): void {}

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
}
