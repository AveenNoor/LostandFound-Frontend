import { Component,OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {

  //Properties
  previewImageUrl: string = '../../assets/Images/avatar.png'; // Default preview image
  tokenSubscription?: Subscription;
  myObject: any = {};

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
  constructor(private router:Router,private el: ElementRef,private jwtService: JwtserviceService, private apiCall:UserApiCallsService){}
  
  //Initializa function
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

    //Get current users profile data
    this.getInitialuserData();
  }

  getInitialuserData(): void {
    // Get current users profile data
    this.apiCall.getUserAPICall().subscribe(
      (response) => {
        console.log("User data is..", response);
        // Update object with API response value
        this.myObject = {
          userImage: response.photoUrl,
          userName: response.name,
          userPhone: response.phoneNumber,
          userCommunity: [], // Initialize an empty array
        };
        if (response.communityNames && Array.isArray(response.communityNames.$values)) {
          this.myObject.userCommunity = response.communityNames.$values;
        }
        // Update form controls with API response value
        this.editNameF?.setValue(this.myObject.userName);
        this.editNumberF?.setValue(this.myObject.userPhone);
        this.editAddressF?.setValue(this.myObject.userAddress);
        this.editCommunityF?.setValue(this.myObject.userCommunity);
        this.editProfForm.get('editImage')?.setValue(this.myObject.userImage);
        this.previewImageUrl = this.myObject.userImage;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

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
  onImageSelected(event: Event) {
    const inputElement = this.el.nativeElement.querySelector('#imageInput') as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      this.editProfForm.get('editImage')?.setValue(selectedFile); // Set the selected file as the value
      this.previewImageUrl = objectUrl;
    }
  }

  //Converting form to formdata
  getFormDataFromForm() {
    const formData = new FormData();
    formData.append('Name', this.editNameF?.value);
    formData.append('Number', this.editNumberF?.value);
    formData.append('Address', this.editAddressF?.value);
    formData.append('Community', this.editCommunityF?.value);
    const selectedImage = this.editProfForm.get('editImage')?.value;
    if (selectedImage) {
      formData.append('ImageFile', selectedImage, 'profile-image.png');
    }
    return formData;
  }

  // On form submission function
  onSubmission(): void {
    const formData = this.getFormDataFromForm();
    this.apiCall.updateUserAPICall(formData).subscribe(
      (response) => {
        console.log('Profile updated:', response);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }


}
