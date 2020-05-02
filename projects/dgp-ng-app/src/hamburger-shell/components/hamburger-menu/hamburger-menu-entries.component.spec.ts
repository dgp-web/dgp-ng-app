import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HamburgerMenuEntriesComponent } from "./hamburger-menu-entries.component";
import { DgpHamburgerMenuModule } from "./hamburger-menu.module";

describe(HamburgerMenuEntriesComponent.name, () => {

    let fixture: ComponentFixture<HamburgerMenuEntriesComponent>;
    let component: HamburgerMenuEntriesComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpHamburgerMenuModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(HamburgerMenuEntriesComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
