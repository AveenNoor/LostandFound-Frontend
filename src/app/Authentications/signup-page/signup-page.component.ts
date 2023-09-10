import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/auth'
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { PopupcomponentComponent } from 'src/app/ReusableComponents/popupcomponent/popupcomponent.component';
import 'firebase/compat/firestore';


var config = {
  apiKey: "AIzaSyAldpHN1RWE9Vv_4UdY6AwYPlr6ltOZ_ec",
  authDomain: "lostandfound2-e3e9e.firebaseapp.com",
  projectId: "lostandfound2-e3e9e",
  storageBucket: "lostandfound2-e3e9e.appspot.com",
  messagingSenderId: "837054571024",
  appId: "1:837054571024:web:ca24c5182d7c5d5fcc6095",
  measurementId: "G-6TWY50430K"
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
  isPasswordVisible : boolean = false;
  isPhoneCorrect : boolean = true;
  input :any ;
 
  //SignUp Form
  signupForm: FormGroup = new FormGroup ({
    userPhone:new FormControl('',[Validators.required, Validators.pattern("\\+92\\d{10}")])
  });

  get userPhoneF(){
    return this.signupForm.get('userPhone');
  }

  //Constructor
  constructor(private router:Router, private dailog : MatDialog, private notification : NgToastService){}

  //Oninit function
  ngOnInit(){
      firebase.initializeApp(config);
      this.setupPhoneInput();
      this.applyPhoneNumberMask();
  }

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

  //Fucntion to generate an OTP and then navigate to otp page
  getOTP() {
    const phoneNumber = this.userPhoneF?.value;
    const phoneNumbersCollection = firebase.firestore().collection('users');
    const query = phoneNumbersCollection.where('phoneNumber', '==', phoneNumber);
  
    query.get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        // Phone number is not registered, generate OTP and navigate to OTP verification page
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
            this.notification.success({detail:"SUCCESS",summary:'OTP Sent Successfully', position:'topCenter'});

            localStorage.setItem(
              'verificationId',
              JSON.stringify(confirmationResult.verificationId)
            );
  
            // Add custom instructions to the OTP verification page
            const customInstructions = 'Please enter the OTP code sent to your phone number.';
  
            // Pass the custom instructions as query parameter to the OTP verification page
            this.router.navigate(['/otpverifypage'], { queryParams: { instructions: customInstructions } });
          })
          .catch((error) => {
            console.log(error.message);
            alert(error.message);
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          });
      } else {
        // Phone number is already registered, show popup message
        const dialogRef = this.dailog.open(PopupcomponentComponent, {
          data: { message: 'Phone number is already registered' },
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          // Handle dialog close event if needed
        });
      }
    }).catch((error) => {
      console.error('Error checking phone number in Firestore:', error);
    });
  }


  //Phone number country code
  setupPhoneInput(): void {
    const userPhoneF = this.signupForm.get('userPhone');
    
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

}

