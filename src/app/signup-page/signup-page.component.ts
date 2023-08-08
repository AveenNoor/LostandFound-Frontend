import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  //Properties
  isPasswordVisible : boolean = false;
  isPasswordVisibleConfirm : boolean = false;
  doPasswordsMatch : boolean = false;

  //SignUp Form
  signupForm: FormGroup = new FormGroup ({
      userImage: new FormControl(''),
      userName:new FormControl('',[Validators.required,Validators.minLength(5)]),
      userEmail:new FormControl('',[Validators.required,Validators.email]),
      userPhone:new FormControl('',[Validators.required,Validators.pattern(/^\+92\d{3}\d{7}$/)]),
      userPassword:new FormControl('',[Validators.required,Validators.minLength(5)]),
      userPasswordConfirm:new FormControl('',[Validators.required]),
      userCommunity:new FormControl('',[Validators.required,Validators.minLength(5)]),
  });

  get userImageF(){
    return this.signupForm.get('userImageF');
  }

  get userNameF(){
    return this.signupForm.get('userName');
  }

  get userEmailF(){
    return this.signupForm.get('userEmail');
  }

  get userPhoneF(){
    return this.signupForm.get('userPhone');
  }

  get userPasswordF(){
    return this.signupForm.get('userPassword');
  }

  get userPasswordConfirmF(){
    return this.signupForm.get('userPasswordConfirm');
  }

  get userCommunityF(){
    return this.signupForm.get('userCommunity');
  }

  //Constructor
  constructor(private router:Router){}

  //Function to navogate to login page on button click
  goToLogin():void{
    this.router.navigate(['/']);
  }

  //Function for when form is submitted
  onSubmit():void {
    console.log('Form Submitted...')
  }

  //View password upon clickling the toggle image
  viewPassword():void{
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  viewPasswordConfirm():void{
    this.isPasswordVisibleConfirm =!this.isPasswordVisibleConfirm;
  }

  //Comparing to check whether conform password matches the password
  confirmPassword():void{
    this.doPasswordsMatch = this.userPasswordF === this.userPasswordConfirmF;
  }

  //Filtering the locations when searching

}

