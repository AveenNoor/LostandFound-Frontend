import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importing Components
import {LoginPageComponent} from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';

const routes: Routes = [
  {path:'',component: LoginPageComponent},
  {path:'signupPage',component: SignupPageComponent},
  {path:'otppage',component:OtpPageComponent},
  {path:'not-found', component: LoginPageComponent},
  {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
