import { Component,OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth'
import 'firebase/firestore'
import {Router} from '@angular/router';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit{

  //Properties
  otp!:string;
  verify :any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '40px',
      height: '40px',
    },
  };

   //Constructor
   constructor(private router:Router){

   }

  //ngoninit function
  ngOnInit(){
    this.verify=JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  //Function to verify OTP from input
  onOtpEntry(otpcode:any){
    this.otp=otpcode;
  }

  //Function HandleClick
  handleClick(){
    var newUserCheck=false;
    var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);
    firebase.auth().signInWithCredential(credentials).then((response)=>{
      console.log(response);
      //checking if the user already exists or is signing up for the first time
      if(response.additionalUserInfo?.isNewUser==true){
        newUserCheck=true;
         this.router.navigate(['/myprofilepage']);
      }
      else if(response.additionalUserInfo?.isNewUser==false){
        newUserCheck=false;
         this.router.navigate(['/dashboardpage']);
      }
    }).catch((error)=>{
      alert(error);
    })
  }
}