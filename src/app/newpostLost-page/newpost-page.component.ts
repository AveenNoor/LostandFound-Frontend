import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-newpost-page',
  templateUrl: './newpost-page.component.html',
  styleUrls: ['./newpost-page.component.css']
})

export class NewpostPageComponent implements OnInit {

  //Properties


  //New post form
  createPost : FormGroup = new FormGroup ({
    postImages : new FormControl ('',[Validators.required])
  })

  get postImagesF(){
    return this.createPost.get('postImages');
  }

  //constructor
  constructor(private router: Router){
  }

  //Ngoninit function
  ngOnInit(): void {
  
  }

  //Function to go to profile
  gotoProfile() : void{
    console.log('Going to my profile page....');
    this.router.navigate(['/myprofilepage']);
  }

  //Function to go to new post page
  gotoNewPost() : void{
    console.log('Going to create new post page....');
    this.router.navigate(['/newpostpage']);
  }

  //Function for multiple image selection
  

}
