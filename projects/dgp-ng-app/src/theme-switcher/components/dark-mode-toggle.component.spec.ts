import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChangeDetectionStrategy } from "@angular/core";
import { DarkModeToggleComponent, ThemeSwitcherState, themeSwitcherStoreFeature, toggleDarkMode } from "dgp-ng-app";
import { Store, StoreModule } from "@ngrx/store";
import { themeSwitcherReducerImpl } from "../reducers/theme-switcher.reducer";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material";

describe(DarkModeToggleComponent.name, () => {

    let fixture: ComponentFixture<DarkModeToggleComponent>;
    let component: DarkModeToggleComponent;

    let store: Store<ThemeSwitcherState>;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatSlideToggleModule,
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducerImpl
                })
            ],
            declarations: [
                DarkModeToggleComponent
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(DarkModeToggleComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });

        fixture = TestBed.createComponent(DarkModeToggleComponent);
        component = fixture.componentInstance;

        store = TestBed.get(Store);

    }));

    it("should create", () => {
        expect(component)
            .toBeDefined();
    });

    it(`toggleDarkMode should dispatch toggleDarkMode`, () => {

        spyOn(store, "dispatch");

        component.toggleDarkMode();

        expect(store.dispatch)
            .toHaveBeenCalledWith(toggleDarkMode());

    });

});
