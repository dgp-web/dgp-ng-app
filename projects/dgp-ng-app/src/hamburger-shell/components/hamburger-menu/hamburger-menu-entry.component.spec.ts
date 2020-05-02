import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HamburgerMenuEntryComponent } from "./hamburger-menu-entry.component";
import { DgpHamburgerMenuModule } from "./hamburger-menu.module";
import { RouterTestingModule } from "@angular/router/testing";

describe(HamburgerMenuEntryComponent.name, () => {

    let fixture: ComponentFixture<HamburgerMenuEntryComponent>;
    let component: HamburgerMenuEntryComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpHamburgerMenuModule,
                RouterTestingModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(HamburgerMenuEntryComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
