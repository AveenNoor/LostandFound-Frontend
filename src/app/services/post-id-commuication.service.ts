// import { Injectable } from '@angular/core';
// import { Subject,Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostIdCommuicationService {

//   //Properties
//   //An observer, you can subscribe but no data
//   private Data = new Subject(); 

//   constructor() { }

//   //Whoever subscribes this method gets this Data
//   //Converts sprint to an observable
//   get PostIDFromDisplay(): any{
//     console.log("Sending data to postdetails page...");  
//     return this.Data.asObservable();
//   }

//   //Recieves data from user list
//   sendpostID(sprint: string): void{
//     console.log("Getting data from found page:",sprint);  
//     this.Data.next(sprint);
//   }
  
// }
import { Injectable } from '@angular/core';
import { ReplaySubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostIdCommuicationService {

  private data = new ReplaySubject<string>(1); // The number inside ReplaySubject specifies the buffer size

  constructor() { }

  get PostIDFromDisplay(): Observable<string> {
    return this.data.asObservable();
  }

  sendpostID(sprint: string): void {
    console.log("Getting data from found page:", sprint);  
    this.data.next(sprint);
  }
}

