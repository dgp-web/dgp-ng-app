import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpDrawerLayoutMenuToggleComponent } from "../drawer-layout-menu-toggle.component";
import { DgpNgAppTestingModule } from "../../__tests__/dgp-ng-app-testing.module";
import { DgpDrawerLayoutComponent } from "../drawer-layout.component";

describe(DgpDrawerLayoutMenuToggleComponent.name, () => {

    let fixture: ComponentFixture<DgpDrawerLayoutMenuToggleComponent>;
    let component: DgpDrawerLayoutMenuToggleComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpNgAppTestingModule,
                DgpDrawerLayoutComponent
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpDrawerLayoutMenuToggleComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
