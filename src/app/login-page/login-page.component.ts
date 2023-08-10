import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';


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
  phoneBorders: boolean = true;

  //Login Form
  loginForm: FormGroup = new FormGroup({
    'userPhone':new FormControl('',[Validators.required,Validators.pattern(/^\+92\d{3}\d{7}$/)]),
    'userPassword': new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  get userPhoneF(){
    return this.loginForm.get('userPhone');
  }

  get userPasswordF(){
    return this.loginForm.get('userPassword');
  }

  //Constructor
  constructor(private router:Router){
    this.loginForm.get('userPhoneF')?.valueChanges.subscribe(newValue => {
      if(this.loginForm.invalid){
        this.isPhoneCorrect=false;
        console.log('Form is',newValue);
      }
    });
  }

  ngOnInit(): void {
    this.setupPhoneInput();
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
      else if(value){
        alert('Invalid Number entered! Please start with 0 or +92 as per your country code.');
      }
    });
  }
}
