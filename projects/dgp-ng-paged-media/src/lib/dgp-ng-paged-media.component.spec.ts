import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DgpNgPagedMediaComponent } from "./dgp-ng-paged-media.component";

describe("DgpNgPagedMediaComponent", () => {
    let component: DgpNgPagedMediaComponent;
    let fixture: ComponentFixture<DgpNgPagedMediaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DgpNgPagedMediaComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DgpNgPagedMediaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
