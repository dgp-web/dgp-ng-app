import { TestBed } from "@angular/core/testing";

import { DgpNgChartsService } from "./dgp-ng-charts.service";

describe("DgpNgChartsService", () => {
    let service: DgpNgChartsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DgpNgChartsService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
