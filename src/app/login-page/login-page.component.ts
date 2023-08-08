import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  //Properties
  isPasswordVisible : boolean = false;
  isEmailCorrect : boolean = true;

  //Login Form
  loginForm: FormGroup = new FormGroup({
    'userEmail': new FormControl('',[Validators.required,Validators.email]),
    'userPassword': new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  get userEmailF(){
    return this.loginForm.get('userEmail');
  }

  get userPasswordF(){
    return this.loginForm.get('userPassword');
  }

  //Constructor
  constructor(private router:Router){
    this.loginForm.get('userEmailF')?.valueChanges.subscribe(newValue => {
      if(this.loginForm.invalid){
        this.isEmailCorrect=false;
        console.log('Form is',newValue);
      }
    });
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

   //View password upon clickling the toggle image
   viewPassword():void{
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  //Validator for email
  onEmailNgIfChange(value: any) {
    console.log(value);
    if (value) {
      this.isEmailCorrect = true;
    } else {
      this.isEmailCorrect = false;
    }
  }
}
