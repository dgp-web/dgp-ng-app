import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DgpNgDataExportComponent } from "./dgp-ng-data-export.component";

describe("DgpNgDataExportComponent", () => {
    let component: DgpNgDataExportComponent;
    let fixture: ComponentFixture<DgpNgDataExportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DgpNgDataExportComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DgpNgDataExportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
