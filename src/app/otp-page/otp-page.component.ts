import { Component,OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit{

  //Properties
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
       width: '50px',
       height: '50px',
     },
   };

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
    var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);
    firebase.auth().signInWithCredential(credentials).then((response)=>{
      console.log(response);
    })
  }
}
