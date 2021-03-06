import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpInspectorModule } from "../inspector.module";
import { InspectorItemComponent } from "./inspector-item.component";

describe(InspectorItemComponent.name, () => {

    let fixture: ComponentFixture<InspectorItemComponent>;
    let component: InspectorItemComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpInspectorModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(InspectorItemComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
