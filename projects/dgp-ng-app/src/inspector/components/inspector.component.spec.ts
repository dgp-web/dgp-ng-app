import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpInspectorModule } from "../inspector.module";
import { InspectorComponent } from "./inspector.component";
import { StoreModule } from "@ngrx/store";

describe(InspectorComponent.name, () => {

    let fixture: ComponentFixture<InspectorComponent>;
    let component: InspectorComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
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
