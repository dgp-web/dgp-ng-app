import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DgpInspectorModule } from "../inspector.module";
import { InspectorComponent } from "./inspector.component";

describe(InspectorComponent.name, () => {

    let fixture: ComponentFixture<InspectorComponent>;
    let component: InspectorComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpInspectorModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(InspectorComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
