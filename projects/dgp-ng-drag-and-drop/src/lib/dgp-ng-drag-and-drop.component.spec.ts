import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DgpNgDragAndDropComponent } from "./dgp-ng-drag-and-drop.component";

describe("DgpNgDragAndDropComponent", () => {
    let component: DgpNgDragAndDropComponent;
    let fixture: ComponentFixture<DgpNgDragAndDropComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DgpNgDragAndDropComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DgpNgDragAndDropComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
