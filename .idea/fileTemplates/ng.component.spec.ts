import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

describe(${Component}.name, () => {

    let fixture: ComponentFixture<${Component}>;
    let component: ${Component};

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            declarations: [
                ${Component}
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(${Component});
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
