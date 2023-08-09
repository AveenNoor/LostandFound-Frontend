import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/auth'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyALPwr6h1fbCfXnc2R8RIL73-mrDzdL_dA",
  authDomain: "lostandfound-161d8.firebaseapp.com",
  projectId: "lostandfound-161d8",
  storageBucket: "lostandfound-161d8.appspot.com",
  messagingSenderId: "59582013943",
  appId: "1:59582013943:web:1ea3aa1315d4ebbd28cef2"
}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  //Properties
  phoneNumber : any;
  reCaptchaVerifier : any;
 
  //SignUp Form
  signupForm: FormGroup = new FormGroup ({
    userPhone:new FormControl('',[Validators.required,Validators.pattern(/^\+92\d{3}\d{7}$/)]),
  });

  get userPhoneF(){
    return this.signupForm.get('userPhone');
  }

  //Constructor
  constructor(private router:Router){}

  //Oninit function
  ngOnInit(){
      firebase.initializeApp(config)
  }

  //Function to navogate to login page on button click
  goToLogin():void{
    this.router.navigate(['/']);
  }

  //Function for when form is submitted
  onSubmit():void {
    console.log('Form Submitted...')
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
        this.router.navigate(['/otppage']);
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

