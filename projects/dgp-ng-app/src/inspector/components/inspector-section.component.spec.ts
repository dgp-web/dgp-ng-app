import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DgpInspectorModule } from "../inspector.module";
import { InspectorSectionComponent } from "./inspector-section.component";

describe(InspectorSectionComponent.name, () => {

    let fixture: ComponentFixture<InspectorSectionComponent>;
    let component: InspectorSectionComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpInspectorModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(InspectorSectionComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
