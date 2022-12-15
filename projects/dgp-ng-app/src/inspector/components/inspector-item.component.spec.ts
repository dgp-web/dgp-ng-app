import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpInspectorModule } from "../inspector.module";
import { InspectorItemComponent } from "./inspector-item.component";
import { InspectorService } from "../services/inspector.service";

describe(InspectorItemComponent.name, () => {

    let fixture: ComponentFixture<InspectorItemComponent>;
    let component: InspectorItemComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpInspectorModule
            ],
            providers: [
                InspectorService
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
