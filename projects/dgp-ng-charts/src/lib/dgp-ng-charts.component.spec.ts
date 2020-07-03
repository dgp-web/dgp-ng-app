import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DgpNgChartsComponent } from "./dgp-ng-charts.component";

describe("DgpNgChartsComponent", () => {
    let component: DgpNgChartsComponent;
    let fixture: ComponentFixture<DgpNgChartsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DgpNgChartsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DgpNgChartsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
