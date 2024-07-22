import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ComponentPrimitiveOverviewTableComponent } from "../component-primitive-overview-table.component";
import { ComponentPrimitivesDocsCoreModule } from "../../component-primitives-docs-core.module";

describe(ComponentPrimitiveOverviewTableComponent.name, () => {

    let fixture: ComponentFixture<ComponentPrimitiveOverviewTableComponent>;
    let component: ComponentPrimitiveOverviewTableComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                ComponentPrimitivesDocsCoreModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(ComponentPrimitiveOverviewTableComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
