import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HamburgerMenuToggleComponent } from "./hamburger-menu-toggle.component";
import { DgpHamburgerMenuToggleModule } from "./hamburger-menu-toggle.module";
import { StoreModule } from "@ngrx/store";
import { hamburgerShellStoreFeature } from "../../models";
import { hamburgerShellReducer } from "../../reducers";

describe(HamburgerMenuToggleComponent.name, () => {

    let fixture: ComponentFixture<HamburgerMenuToggleComponent>;
    let component: HamburgerMenuToggleComponent;


    beforeEach(waitForAsync(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [hamburgerShellStoreFeature]: hamburgerShellReducer
                }),
                DgpHamburgerMenuToggleModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HamburgerMenuToggleComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
