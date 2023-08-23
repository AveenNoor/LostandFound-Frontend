import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myposts-page',
  templateUrl: './myposts-page.component.html',
  styleUrls: ['./myposts-page.component.css']
})
export class MypostsPageComponent {
  //Properties
  posts = [
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' },
    { imageUrl: 'https://via.placeholder.com/200x250' }];

  //Constructor
  constructor(private router:Router){

  }

  //Function to go to profile
  gotoProfile() : void{
  console.log('Going to my profile page....');
  this.router.navigate(['/myprofilepage']);
  }

  //Function to go to post details
  gotoPostDetails() : void{
    console.log('Going to post details page....');
    this.router.navigate(['/postdetailspage']);
  }

}
