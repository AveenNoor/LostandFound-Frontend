import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Libarries
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgOtpInputModule } from 'ng-otp-input';
import {NgxMaskModule} from 'ngx-mask';
import { AuthService } from './auth.service';
import {MatGridListModule} from '@angular/material/grid-list';

//Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ForgotPasswordComponent } from './ForgotPassword/forgot-password/forgot-password.component';
import { MyprofilepageComponent } from './myprofilepage/myprofilepage.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { OtpverifyPageComponent } from './otpverify-page/otpverify-page.component';
import { NewpostPageComponent } from './newpostLost-page/newpost-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    OtpPageComponent,
    ForgotPasswordComponent,
    MyprofilepageComponent,
    DashboardPageComponent,
    OtpverifyPageComponent,
    NewpostPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgOtpInputModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
