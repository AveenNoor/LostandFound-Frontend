import { TestBed } from '@angular/core/testing';

import { ItemApiCallsService } from './item-api-calls.service';

describe('ItemApiCallsService', () => {
  let service: ItemApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
