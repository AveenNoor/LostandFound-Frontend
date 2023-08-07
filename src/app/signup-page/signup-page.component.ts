import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  constructor(private router:Router){}

  //Function to navogate to login page on button click
  goToLogin():void{
    this.router.navigate(['/']);
  }
}
