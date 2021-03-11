import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HamburgerMenuComponent } from "./hamburger-menu.component";
import { DgpHamburgerMenuModule } from "./hamburger-menu.module";

describe(HamburgerMenuComponent.name, () => {

    let fixture: ComponentFixture<HamburgerMenuComponent>;
    let component: HamburgerMenuComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpHamburgerMenuModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(HamburgerMenuComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
