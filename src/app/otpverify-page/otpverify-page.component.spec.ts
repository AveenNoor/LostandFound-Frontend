import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverifyPageComponent } from './otpverify-page.component';

describe('OtpverifyPageComponent', () => {
  let component: OtpverifyPageComponent;
  let fixture: ComponentFixture<OtpverifyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpverifyPageComponent]
    });
    fixture = TestBed.createComponent(OtpverifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
