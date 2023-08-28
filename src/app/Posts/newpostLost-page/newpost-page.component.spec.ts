import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpostPageComponent } from './newpost-page.component';

describe('NewpostPageComponent', () => {
  let component: NewpostPageComponent;
  let fixture: ComponentFixture<NewpostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewpostPageComponent]
    });
    fixture = TestBed.createComponent(NewpostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
