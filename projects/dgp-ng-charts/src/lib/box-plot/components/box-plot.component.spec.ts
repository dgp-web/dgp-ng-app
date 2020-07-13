import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BoxPlotComponent } from "./box-plot.component";
import { DgpNgChartsModule } from "../../dgp-ng-charts.module";

describe(BoxPlotComponent.name, () => {

    let fixture: ComponentFixture<BoxPlotComponent>;
    let component: BoxPlotComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpNgChartsModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(BoxPlotComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
