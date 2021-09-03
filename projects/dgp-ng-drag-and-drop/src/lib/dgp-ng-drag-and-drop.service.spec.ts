import { TestBed } from "@angular/core/testing";

import { DgpNgDragAndDropService } from "./dgp-ng-drag-and-drop.service";

describe("DgpNgDragAndDropService", () => {
    let service: DgpNgDragAndDropService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DgpNgDragAndDropService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
