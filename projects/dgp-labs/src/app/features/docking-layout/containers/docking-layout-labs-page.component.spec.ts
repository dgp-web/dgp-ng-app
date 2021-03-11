import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DockingLayoutLabsPageComponent } from "./docking-layout-labs-page.component";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpSpacerModule, DgpThemeSwitcherModule } from "dgp-ng-app";
import { DgpDockingLayoutModule, DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

describe(DockingLayoutLabsPageComponent.name, () => {

    let fixture: ComponentFixture<DockingLayoutLabsPageComponent>;
    let component: DockingLayoutLabsPageComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            declarations: [
                DockingLayoutLabsPageComponent
            ],
            imports: [
                DgpPageHeaderModule,
                DgpSpacerModule,
                DgpDockingLayoutModule,
                DgpHamburgerMenuToggleModule,
                DgpThemeSwitcherModule.forRoot(),
                StoreModule.forRoot({}),
                EffectsModule.forRoot([])
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DockingLayoutLabsPageComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
