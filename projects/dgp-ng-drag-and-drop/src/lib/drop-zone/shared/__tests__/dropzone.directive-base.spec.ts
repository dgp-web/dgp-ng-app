import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpDropzoneDirectiveBase } from "../dropzone.directive-base";
import { Component } from "@angular/core";
import { DgpDragAndDropModule } from "../../../data/drag-and-drop.module";

@Component({
    selector: "dgp-test-dropzone",
    template: ``
})
export class TestDropzoneComponent extends DgpDropzoneDirectiveBase<any> {
}

describe(DgpDropzoneDirectiveBase.name, () => {

    let fixture: ComponentFixture<DgpDropzoneDirectiveBase<any>>;
    let component: DgpDropzoneDirectiveBase<any>;

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

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

    it("toggleDropIndicator should set showDropIndicator to the passed payload.", () => {
        const isModelDragged = true;
        component.toggleDropIndicator(isModelDragged);
        expect(component.showDropIndicator).toBe(isModelDragged);
    });

});
