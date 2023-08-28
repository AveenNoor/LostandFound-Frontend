import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myprofilepage',
  templateUrl: './myprofilepage.component.html',
  styleUrls: ['./myprofilepage.component.css']
})

export class MyprofilepageComponent {

  //Constructor
  constructor(private router:Router){}

  //Function to go to profile
  gotoProfile() : void{
    console.log('Going to my profile page....');
    this.router.navigate(['/myprofilepage']);
  }

  //Function to go to edit profile
  gotoEditProfile():void{
    console.log('Going to edit page....');
    this.router.navigate(['/editprofilepage']);
  }

  //Function to go to new post page
  gotoNewPost() : void{
    console.log('Going to create new post page....');
    this.router.navigate(['/newpostpage']);
  }

}
