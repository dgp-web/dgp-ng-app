import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpNgChartsModule } from "../dgp-ng-charts.module";
import { DgpConnectedScatterPlotComponent } from "./line-chart.component";

describe(DgpConnectedScatterPlotComponent.name, () => {

    let fixture: ComponentFixture<DgpConnectedScatterPlotComponent>;
    let component: DgpConnectedScatterPlotComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpNgChartsModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpConnectedScatterPlotComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
