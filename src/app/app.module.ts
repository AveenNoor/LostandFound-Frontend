import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Libarries
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgOtpInputModule } from 'ng-otp-input';
import {NgxMaskModule} from 'ngx-mask';
import { AuthService } from './auth.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {GoogleMapsModule} from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule} from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Authentications/login-page/login-page.component';
import { SignupPageComponent } from './Authentications/signup-page/signup-page.component';
import { ForgotPasswordComponent } from './ForgotPassword/forgot-password/forgot-password.component';
import { MyprofilepageComponent } from './Profile/myprofilepage/myprofilepage.component';
import { DashboardPageComponent } from './MainDisplays/dashboard-page/dashboard-page.component';
import { OtpverifyPageComponent } from './Authentications/otpverify-page/otpverify-page.component';
import { NewpostPageComponent } from './Posts/newpostLost-page/newpost-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfilePageComponent } from './Profile/edit-profile-page/edit-profile-page.component';
import { MypostsPageComponent } from './Posts/myposts-page/myposts-page.component';
import { PostdetailsPageComponent } from './Posts/postdetails-page/postdetails-page.component';
import { HeadersInterceptor } from './interceptors/headers.interceptor';

//Get JWT token from local storage
export function tokenGetter() {
  return localStorage.getItem('access_token'); // Adjust this according to where you store the token
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    ForgotPasswordComponent,
    MyprofilepageComponent,
    DashboardPageComponent,
    OtpverifyPageComponent,
    NewpostPageComponent,
    EditProfilePageComponent,
    MypostsPageComponent,
    PostdetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    NgOtpInputModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    GoogleMapsModule,
    NgbModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        disallowedRoutes : []
      }
    })
    
  ],
  providers: [
    AuthService,
    {provide:HTTP_INTERCEPTORS , useClass:HeadersInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
