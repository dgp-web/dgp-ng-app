import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChangeDetectionStrategy } from "@angular/core";

describe(${Component}.name, () => {

    let fixture: ComponentFixture<${Component}>;
    let component: ${Component};


    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            declarations: [
                ${Component}
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(${Component}, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });

        fixture = TestBed.createComponent(${Component});
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
