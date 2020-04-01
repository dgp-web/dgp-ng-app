import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SpacerComponent } from "./spacer.component";

describe(SpacerComponent.name, () => {

    let fixture: ComponentFixture<SpacerComponent>;
    let component: SpacerComponent;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            declarations: [
                SpacerComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SpacerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
