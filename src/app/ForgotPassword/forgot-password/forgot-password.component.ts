import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  //Properties

  //ForgotPassword Form
  forgotpasswordForm: FormGroup = new FormGroup ({
    'userPhone':new FormControl('',[Validators.required,Validators.pattern(/^\+92\d{3}\d{7}$/)]),
  });

  //Getter functions
  get userPhoneF(){
    return this.forgotpasswordForm.get('userPhone');
  }

  //Function for submission of form
  onSubmit(){
    
  }
}
