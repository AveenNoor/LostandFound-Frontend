import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveditemsPageComponent } from './saveditems-page.component';

describe('SaveditemsPageComponent', () => {
  let component: SaveditemsPageComponent;
  let fixture: ComponentFixture<SaveditemsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveditemsPageComponent]
    });
    fixture = TestBed.createComponent(SaveditemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
