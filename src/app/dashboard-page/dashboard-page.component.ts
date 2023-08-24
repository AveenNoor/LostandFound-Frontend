import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
 //Properties
 images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
 productDescription: string = ' Stay in the loop with notifications, track your fitness goals, and even make payments right from your wrist. With its stylish design and advanced features, our smartwatch is the perfect blend of fashion and functionality. Elevate your lifestyle today!';

 //constructor
 constructor(private router: Router){
 }

 //Function to go to profile
 gotoProfile() : void{
   console.log('Going to my profile page....');
   this.router.navigate(['/myprofilepage']);
 }

 //Function to go to product description
 goToDetails() : void {
   console.log('Going to my profile page....');
   this.router.navigate(['/myprofilepage']);
 }

 //Function to go to new post page
 gotoNewPost() : void{
   console.log('Going to create new post page....');
   this.router.navigate(['/newpostpage']);
 }
}
