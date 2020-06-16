import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SplitPanelLabsPageComponent } from "./split-panel-labs-page.component";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpSpacerModule } from "dgp-ng-app";
import { DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { StoreModule } from "@ngrx/store";

describe(SplitPanelLabsPageComponent.name, () => {

    let fixture: ComponentFixture<SplitPanelLabsPageComponent>;
    let component: SplitPanelLabsPageComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            declarations: [
                SplitPanelLabsPageComponent
            ],
            imports: [
                DgpPageHeaderModule,
                DgpSpacerModule,
                DgpSplitPanelModule,
                DgpHamburgerMenuToggleModule,
                StoreModule.forRoot({})
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(SplitPanelLabsPageComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
