import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { HeatmapDemoConfigFormComponent } from "../heatmap-demo-config-form.component";
import { AppTestingModule } from "../../../../../app/__tests__/app-testing.module";
import { ChartDocsCoreModule } from "../../../chart-docs-core.module";

describe(HeatmapDemoConfigFormComponent.name, () => {

    let fixture: ComponentFixture<HeatmapDemoConfigFormComponent>;
    let component: HeatmapDemoConfigFormComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                AppTestingModule,
                ChartDocsCoreModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(HeatmapDemoConfigFormComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

    it("updateRows should call updateModel with rows when valid.", () => {
        spyOn(component, "updateModel");
        component.updateRows(5);
        expect(component.updateModel).toHaveBeenCalledWith({rows: 5});
    });

    it("updateRows should NOT call updateModel when rows is invalid (too small).", () => {
        spyOn(component, "updateModel");
        component.updateRows(0);
        expect(component.updateModel).not.toHaveBeenCalled();
    });

    it("updateRows should NOT call updateModel when rows is invalid (too large).", () => {
        spyOn(component, "updateModel");
        component.updateRows(1001);
        expect(component.updateModel).not.toHaveBeenCalled();
    });

    it("updateColumns should call updateModel with columns when valid.", () => {
        spyOn(component, "updateModel");
        component.updateColumns(10);
        expect(component.updateModel).toHaveBeenCalledWith({columns: 10});
    });

    it("updateColumns should NOT call updateModel when columns is invalid (too small).", () => {
        spyOn(component, "updateModel");
        component.updateColumns(0);
        expect(component.updateModel).not.toHaveBeenCalled();
    });

    it("updateColumns should NOT call updateModel when columns is invalid (too large).", () => {
        spyOn(component, "updateModel");
        component.updateColumns(1001);
        expect(component.updateModel).not.toHaveBeenCalled();
    });

    it("updateUseNullValues should call updateModel with useNullValues.", () => {
        spyOn(component, "updateModel");
        component.updateUseNullValues(true);
        expect(component.updateModel).toHaveBeenCalledWith({useNullValues: true});

        component.updateUseNullValues(false);
        expect(component.updateModel).toHaveBeenCalledWith({useNullValues: false});
    });

});
