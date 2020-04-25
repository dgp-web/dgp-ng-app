import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DgpContainer } from "./container.component-base";
import { StoreModule } from "@ngrx/store";
import { Component } from "@angular/core";

@Component({
    selector: "dgp-dummy",
    template: ""
})
class TestComponent extends DgpContainer {
}

describe(DgpContainer.name, () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ],
            declarations: [
                TestComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

    it(`dispatch should call store.dispatch`, () => {
        
    });

});
