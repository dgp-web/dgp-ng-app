import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpDropzoneDirectiveBase } from "../dropzone.directive-base";
import { Component } from "@angular/core";
import { DgpDragAndDropModule } from "../../../data/drag-and-drop.module";
import { DgpDragAndDropService } from "../../../data/services/drag-and-drop.service";
import { of } from "rxjs";
import { WithDragContext } from "../../../models";

@Component({
    selector: "dgp-test-dropzone",
    template: ``
})
export class TestDropzoneComponent extends DgpDropzoneDirectiveBase<any> {
}

describe(DgpDropzoneDirectiveBase.name, () => {

    const payload: WithDragContext = {dragContext: "context"};

    let fixture: ComponentFixture<DgpDropzoneDirectiveBase<any>>;
    let component: DgpDropzoneDirectiveBase<any>;
    let service: DgpDragAndDropService;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpDragAndDropModule
            ],
            declarations: [
                TestDropzoneComponent
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(TestDropzoneComponent);
        component = fixture.componentInstance;

        service = testBed.inject(DgpDragAndDropService);
    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

    it(`setting a dragContext should call dragAndDropService.isModelDragged$ .`, async () => {
        const isModelDragged = true;
        spyOn(service, "isModelDragged$").and.returnValue(of(isModelDragged));
        component.dragContext = payload.dragContext;
        component.ngOnChanges({
            dragContext: {
                currentValue: payload.dragContext,
                firstChange: true,
                previousValue: null,
                isFirstChange(): boolean {
                    return true;
                }
            }
        });
        fixture.detectChanges();
        await fixture.whenStable();
        expect(service.isModelDragged$).toHaveBeenCalledWith(payload);
    });

    it(`setting a dragContext should cause showDropIndicator to be set depending on whether the model is dragged.`, async () => {
        const isModelDragged = true;
        spyOn(service, "isModelDragged$").and.returnValue(of(isModelDragged));
        component.dragContext = payload.dragContext;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.showDropIndicator).toBe(isModelDragged);
    });

});
