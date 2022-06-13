import { TestBed } from "@angular/core/testing";

import { DgpNgDataExportService } from "./dgp-ng-data-export.service";

describe("DgpNgDataExportService", () => {
    let service: DgpNgDataExportService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DgpNgDataExportService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
