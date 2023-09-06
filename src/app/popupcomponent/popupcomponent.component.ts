import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popupcomponent',
  templateUrl: './popupcomponent.component.html',
  styleUrls: ['./popupcomponent.component.css']
})
export class PopupcomponentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
