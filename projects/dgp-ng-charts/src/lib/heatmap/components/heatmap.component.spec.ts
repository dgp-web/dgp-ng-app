import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DgpHeatmapModule } from "../heatmap.module";
import { HeatmapComponent } from "./heatmap.component";

describe(HeatmapComponent.name, () => {

    let fixture: ComponentFixture<HeatmapComponent>;
    let component: HeatmapComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpHeatmapModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(HeatmapComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
