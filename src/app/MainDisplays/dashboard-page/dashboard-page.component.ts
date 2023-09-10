
import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { JwtserviceService } from 'src/app/services/jwtservice.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {

  //Properties
  tokenSubscription?: Subscription;

  //constructor
  constructor(private router: Router,private jwtService: JwtserviceService){
  }

  ngOnInit(): void {
    this.tokenSubscription = this.jwtService.getDecodedToken().subscribe(
      (tokenData) => {
        console.log(tokenData);
        console.log('UserID is...',tokenData.user_id);
      },
      (error) => {
        console.error('Error fetching token:', error);
      }
    );
  }

  //Navigation Function
  goto(data:string){
    this.router.navigate([data]);
  }
}
