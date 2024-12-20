import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  //Properties
  title:string = 'ProjectV1';

  //Constructor
  constructor(private router:Router){
  }

  ngOnInit(): void {
    this.router.navigate(['/']);
    // this.router.navigate(['/otpverifypage']);
    // this.router.navigate(['/founditemspage'])
    // this.router.navigate(['/lostitemspage']);
    // this.router.navigate(['/newpostpage']);
    // this.router.navigate(['/dashbaordpage']);
    // this.router.navigate(['/postdetailspage']);
    // this.router.navigate(['/mypostspage']);
    // this.router.navigate(['editprofilepage']);

  }

}
