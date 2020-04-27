import { TestBed } from '@angular/core/testing';

import { DgpNgDockingLayoutService } from './dgp-ng-docking-layout.service';

describe('DgpNgDockingLayoutService', () => {
  let service: DgpNgDockingLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DgpNgDockingLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
