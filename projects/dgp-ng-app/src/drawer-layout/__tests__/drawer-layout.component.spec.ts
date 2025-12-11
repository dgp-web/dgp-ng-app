import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { DgpDrawerLayoutComponent } from "../drawer-layout.component";
import { DgpNgAppTestingModule } from "../../__tests__/dgp-ng-app-testing.module";

describe(DgpDrawerLayoutComponent.name, () => {

    let fixture: ComponentFixture<DgpDrawerLayoutComponent>;
    let component: DgpDrawerLayoutComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpNgAppTestingModule,
                DgpDrawerLayoutComponent
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpDrawerLayoutComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
