import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailsPageComponent } from './postdetails-page.component';

describe('PostdetailsPageComponent', () => {
  let component: PostdetailsPageComponent;
  let fixture: ComponentFixture<PostdetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostdetailsPageComponent]
    });
    fixture = TestBed.createComponent(PostdetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
