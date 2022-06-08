import { TestBed } from "@angular/core/testing";

import { DgpNgPagedMediaService } from "./dgp-ng-paged-media.service";

describe("DgpNgPagedMediaService", () => {
    let service: DgpNgPagedMediaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DgpNgPagedMediaService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
