import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importing Components
import {LoginPageComponent} from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ForgotPasswordComponent } from './ForgotPassword/forgot-password/forgot-password.component';
import { MyprofilepageComponent } from './myprofilepage/myprofilepage.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { OtpverifyPageComponent } from './otpverify-page/otpverify-page.component';

const routes: Routes = [
  {path:'',component: LoginPageComponent},
  {path:'signupPage',component: SignupPageComponent},
  {path:'otppage',component:OtpPageComponent},
  {path:'otpverifypage',component:OtpverifyPageComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path:'myprofilepage',component:MyprofilepageComponent},
  {path:'dashboardpage',component:DashboardPageComponent},
  {path:'not-found', component: LoginPageComponent},
  {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
