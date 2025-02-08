import { TestBed } from '@angular/core/testing';

import { DgpNgTablesService } from './dgp-ng-tables.service';

describe('DgpNgTablesService', () => {
  let service: DgpNgTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DgpNgTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
