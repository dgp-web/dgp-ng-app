import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HamburgerMenuHeaderComponent } from "./hamburger-menu-header.component";
import { DgpHamburgerMenuModule } from "./hamburger-menu.module";

describe(HamburgerMenuHeaderComponent.name, () => {

    let fixture: ComponentFixture<HamburgerMenuHeaderComponent>;
    let component: HamburgerMenuHeaderComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpHamburgerMenuModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(HamburgerMenuHeaderComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
