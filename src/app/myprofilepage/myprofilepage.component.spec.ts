import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofilepageComponent } from './myprofilepage.component';

describe('MyprofilepageComponent', () => {
  let component: MyprofilepageComponent;
  let fixture: ComponentFixture<MyprofilepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofilepageComponent]
    });
    fixture = TestBed.createComponent(MyprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
