import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/auth'
import 'firebase/firestore'
import { JwtHelperService } from '@auth0/angular-jwt';

//Connection with firebase
var config = {
  apiKey: "AIzaSyALPwr6h1fbCfXnc2R8RIL73-mrDzdL_dA",
  authDomain: "lostandfound-161d8.firebaseapp.com",
  projectId: "lostandfound-161d8",
  storageBucket: "lostandfound-161d8.appspot.com",
  messagingSenderId: "59582013943",
  appId: "1:59582013943:web:1ea3aa1315d4ebbd28cef2"
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit{

  //Properties
  isPasswordVisible : boolean = false;
  isPhoneCorrect : boolean = true;
  countryCode:string ='+92';
  rememberMe: boolean = false;
  input :any ;
  phoneNumber : any;
  reCaptchaVerifier : any;

  //Login Form
  loginForm: FormGroup = new FormGroup({
    userPhone:new FormControl('',[Validators.required, Validators.pattern("\\+92\\d{10}")])
  })

  //Getter function for form controls
  get userPhoneF(){
    return this.loginForm.get('userPhone');
  }

  //Constructor
  constructor(private router:Router,private jwtHelper: JwtHelperService){
    this.loginForm.get('userPhoneF')?.valueChanges.subscribe(newValue => {
      if(this.loginForm.invalid){
        this.isPhoneCorrect=false;
        console.log('Form is',newValue);
      }
    });
    //Remember me option implementation
    // Check local storage for remembered username
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      this.loginForm.get('username')?.setValue(rememberedUsername);
      this.rememberMe = true;
    }
  }

  //On initialize function
  ngOnInit(): void {
    firebase.initializeApp(config);
    this.setupPhoneInput();
    this.setupPhoneInput();
    this.applyPhoneNumberMask();
    if(!this.isTokenValid){
      this.router.navigate(['/dashboardpage']);
    }
  }

  //Navigate to signup on clicking Sign Up button
  goToSignup():void{
    this.router.navigate(['signupPage']);
  }

  //Checking whether the user credentials that have been entered exist and are correct or not
  validateLogin():void{
    console.log('Validating login...');
  }

  //Alert Messages
  onInputChange(control: FormControl) {
    if (control.invalid && control.touched) {
      alert('Input is invalid and touched.');
    }
  }

  //Validator for phone
  onPhoneNgIfChange(value: any) {
    console.log(value);
    if (value) {
      this.isPhoneCorrect = true;
    } else {
      this.isPhoneCorrect = false;
    }
  }

  //Phone number country code
  setupPhoneInput(): void {
    const userPhoneF = this.loginForm.get('userPhone');
    
    userPhoneF?.valueChanges.subscribe((value: string) => {
      if (value && value.startsWith('0')) {
        const phoneNumber = '+92' + value.slice(1);
        userPhoneF.setValue(phoneNumber, { emitEvent: false });
      }
      else if(value && value.startsWith('+92')){}
    });
  }

  //Masking
  applyPhoneNumberMask() {
    // Define the mask pattern
    const maskPattern = ""; // Example pattern: (+92) 123 456789
    this.input =this.userPhoneF;
    let result = "";
    let inputIndex = 0;
    // Iterate through the mask pattern
    for (let char of maskPattern) {
      if (char === "9" && inputIndex < this.input.length) {
        result += this.input[inputIndex];
        inputIndex++;
      } else {
        result += char;
      }
    }
    this.userPhoneF?.setValue(result, { emitEvent: false });
    console.log(result);
  }

  get isTokenValid(): boolean {
    const token = localStorage.getItem('authToken'); // Retrieve the token from storage
    if (!this.jwtHelper.isTokenExpired(token)) {
      return true;
    } 
    return false; // Token not found
  }

  //Remember me option code
  login() {
    const userphonenumber = this.loginForm.get('userPhone')?.value;
    // Your authentication logic here
    // If "Remember Me" is checked, store the username in local storage
    if (this.rememberMe) {
      localStorage.setItem('rememberedUsername', userphonenumber);
    } else {
      localStorage.removeItem('rememberedUsername');
    }
  }

   //Fucntion to generate an OTP and then navigate to otp page
   getOTP(){
    var phoneNumber=this.userPhoneF?.value;
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      }
    );
    console.log(this.reCaptchaVerifier);
    console.log(phoneNumber);
    firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, this.reCaptchaVerifier)
    .then((confirmationResult) => {
      console.log(confirmationResult);
      localStorage.setItem(
        'verificationId',
        JSON.stringify(confirmationResult.verificationId)
      );
      this.router.navigate(['/otpverifypage']);
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    });
  } 
}
