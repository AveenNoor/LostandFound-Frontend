import { TestBed } from '@angular/core/testing';

import { GetMyLocationService } from './get-my-location.service';

describe('GetMyLocationService', () => {
  let service: GetMyLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMyLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
