import { TestBed } from '@angular/core/testing';

import { DgpNgImageEditorService } from './dgp-ng-image-editor.service';

describe('DgpNgImageEditorService', () => {
  let service: DgpNgImageEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DgpNgImageEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
