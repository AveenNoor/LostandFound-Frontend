import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent {

  //Properties
  previewImageUrl: string = '../../assets/Images/avatar.png'; // Default preview image

  //EditProfForm
  editProfForm : FormGroup = new FormGroup ({
    editImage : new FormControl('',[]),
    editName : new FormControl('',[]),
    editNumber : new FormControl('',[Validators.pattern("\\+92\\d{10}")]),
    editAddress : new FormControl('',[Validators.minLength(5)]),
    editCommunity : new FormControl('',[])
  })

  //Getter functions for form controls
  get editNameF(){
    return this.editProfForm.get('editName');
  }

  get editNumberF(){
    return this.editProfForm.get('editNumber');
  }

  get editAddressF(){
    return this.editProfForm.get('editAddress');
  }

  get editCommunityF(){
    return this.editProfForm.get('editCommunity');
  }

  //Constructor
  constructor(private router:Router){}
  
  //Function to go to profile
  gotoProfile() : void{
    console.log('Going to my profile page....');
    this.router.navigate(['/myprofilepage']);
  }

  //Function to go to new post page
  gotoNewPost() : void{
    console.log('Going to create new post page....');
    this.router.navigate(['/newpostpage']);
  }

  //Preview selected image
  onImageSelected(event:Event){
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      this.previewImageUrl = objectUrl;
    }
  }
}


