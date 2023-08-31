import { TestBed } from '@angular/core/testing';

import { PostIdCommuicationService } from './post-id-commuication.service';

describe('PostIdCommuicationService', () => {
  let service: PostIdCommuicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostIdCommuicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
