import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importing Components
import { LoginPageComponent } from './Authentications/login-page/login-page.component';
import { SignupPageComponent } from './Authentications/signup-page/signup-page.component';
import { ForgotPasswordComponent } from './ForgotPassword/forgot-password/forgot-password.component';
import { MyprofilepageComponent } from './Profile/myprofilepage/myprofilepage.component';
import { DashboardPageComponent } from './MainDisplays/dashboard-page/dashboard-page.component';
import { OtpverifyPageComponent } from './Authentications/otpverify-page/otpverify-page.component';
import { NewpostPageComponent } from './Posts/newpostLost-page/newpost-page.component';
import { EditProfilePageComponent } from './Profile/edit-profile-page/edit-profile-page.component';
import { MypostsPageComponent } from './Posts/myposts-page/myposts-page.component';
import { PostdetailsPageComponent } from './Posts/postdetails-page/postdetails-page.component';
import { FoundItemsComponent } from './MainDisplays/found-items-page/found-items.component';
import { LostItemsComponent } from './MainDisplays/lost-items-page/lost-items.component';
import { SaveditemsPageComponent } from './Posts/saveditems-page/saveditems-page.component';
import { FooterComponent } from './MainDisplays/footer/footer.component';
import { NotificationsComponent } from './MainDisplays/notifications/notifications.component';

const routes: Routes = [
  {path:'',component: LoginPageComponent},
  {path:'signupPage',component: SignupPageComponent},
  {path:'otpverifypage',component:OtpverifyPageComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path:'myprofilepage',component:MyprofilepageComponent},
  {path:'dashboardpage',component:DashboardPageComponent},
  {path:'newpostpage',component:NewpostPageComponent},
  {path:'editprofilepage',component:EditProfilePageComponent},
  {path:'mypostspage',component:MypostsPageComponent},
  {path:'postdetailspage',component:PostdetailsPageComponent},
  {path:'founditemspage',component:FoundItemsComponent},
  {path:'lostitemspage',component:LostItemsComponent},
  {path:'footer',component:FooterComponent},
  {path:'saveditemspage',component:SaveditemsPageComponent},
  {path:'notifications',component:NotificationsComponent},
  {path:'not-found', component: LoginPageComponent},
  {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
