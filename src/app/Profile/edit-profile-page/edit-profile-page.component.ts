import { Component,OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators,FormArray } from '@angular/forms';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';
import { UserApiCallsService } from 'src/app/services/user-api-calls.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {

  //Properties
  previewImageUrl: string = 'https://exceedinternal.azurewebsites.net/dummy/461fafff-aa19-4842-af9d-31133283abb7.jpg'; // Default preview image
  tokenSubscription?: Subscription;
  myObject: any = {};

  //EditProfForm
  editProfForm : FormGroup = new FormGroup ({
    editImage : new FormControl('',[]),
    editName : new FormControl('',[]),
    editNumber : new FormControl('',[Validators.pattern("\\+92\\d{10}")]),
    editAddress : new FormControl('',[Validators.minLength(5)]),
    editCommunity: new FormControl(),
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

  get editImageF(){
    return this.editProfForm.get('editImage');
  }

  //Constructor
  constructor(private notification: NgToastService,private router:Router,private el: ElementRef,private jwtService: JwtserviceService, private apiCall:UserApiCallsService){
    this.tokenSubscription = this.jwtService.getDecodedToken().subscribe(
      (tokenData) => {console.log(tokenData);
      },
      (error) => {
        console.error('Error fetching token:', error);
      }
    );
  }
  
  //Initializa function
  ngOnInit(): void {
    //Code for subscribing to service to get username and ID from jwt token  
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
          userAddress: response.address,
          userCommunity: [], // Initialize an empty array
        };
        console.log(this.myObject);
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

  //Navigation Function
  goto(data:string){
    this.router.navigate([data]);
  }

  //Add multple values to community array
  addCommunity() {
    const newCommunityControl = new FormControl('');
    (this.editProfForm.get('editCommunity') as FormArray).push(newCommunityControl);
  }
  
  //Remove multple values to community array
  removeCommunity(index: number) {
    (this.editProfForm.get('editCommunity') as FormArray).removeAt(index);
  }

  //Preview selected image
  onImageSelected(event: Event) {
    const inputElement = this.el.nativeElement.querySelector('#imageInput') as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      this.editProfForm.get('editImage')?.setValue(selectedFile); // Set the selected file as the value
      this.previewImageUrl = objectUrl;
      console.log(this.previewImageUrl);
    }
  }

  //Converting form to formdata
  getFormDataFromForm() {
    const formData = new FormData();
    formData.append('Username', this.editNameF?.value);
    formData.append('Number', this.editNumberF?.value);
    formData.append('Address', this.editAddressF?.value);
    // formData.append('Community[]', this.editCommunityF?.value);  
    formData.append('Community[0].CommunityName', this.editCommunityF?.value)
    formData.append('imageFile',this.editImageF?.value);
    // Create an empty object to hold key-value pairs
    const formDataObject: { [key: string]: any } = {};
    // Iterate over the keys in FormData and add them to the object
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    // Display the FormData contents as an object in the console
    console.log(formDataObject);
    return formData;
  }
  

  // On form submission function
  onSubmission(): void {
    const formData = this.getFormDataFromForm();
    this.apiCall.updateUserAPICall(formData).subscribe(
      (response) => {
        this.notification.success({ detail: 'SUCCESS', summary: 'Profile Updated Successfully', position: 'topCenter' });
        console.log('Profile updated:', response);
      },
      (error) => {
        this.notification.success({ detail: 'SUCCESS', summary: 'Error Updating Profile', position: 'topCenter' });
        console.error('Error updating profile:', error);
      }
    );
  }

}
