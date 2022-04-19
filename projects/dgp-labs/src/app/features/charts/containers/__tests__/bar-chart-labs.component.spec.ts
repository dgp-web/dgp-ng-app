import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BarChartLabsComponent } from "../bar-chart-labs.component";

describe(BarChartLabsComponent.name, () => {

    let fixture: ComponentFixture<BarChartLabsComponent>;
    let component: BarChartLabsComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            declarations: [
                BarChartLabsComponent
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(BarChartLabsComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
