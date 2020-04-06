import { TestBed } from '@angular/core/testing';

import { CollectedDataService } from './collected-data.service';

describe('CollectedDataService', () => {
  let service: CollectedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
