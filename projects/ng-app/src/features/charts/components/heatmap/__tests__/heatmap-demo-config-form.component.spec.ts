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

});
