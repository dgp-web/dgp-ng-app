import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpNgChartsModule } from "../dgp-ng-charts.module";
import { LineChartComponent } from "./line-chart.component";

describe(LineChartComponent.name, () => {

    let fixture: ComponentFixture<LineChartComponent>;
    let component: LineChartComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpNgChartsModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(LineChartComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
