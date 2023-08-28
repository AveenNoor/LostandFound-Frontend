import { TestBed } from '@angular/core/testing';

import { UserApiCallsService } from './user-api-calls.service';

describe('UserApiCallsService', () => {
  let service: UserApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
