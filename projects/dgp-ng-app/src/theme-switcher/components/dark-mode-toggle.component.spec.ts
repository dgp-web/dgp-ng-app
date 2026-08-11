import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ChangeDetectionStrategy } from "@angular/core";
import { Action, Store, StoreModule } from "@ngrx/store";
import { themeSwitcherReducer } from "../reducers";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { toggleDarkMode } from "../actions";
import { DarkModeToggleComponent } from "./dark-mode-toggle.component";
import { ThemeSwitcherState, themeSwitcherStoreFeature } from "../models";
import { ActionSpy } from "../../testing";

describe(DarkModeToggleComponent.name, () => {

    let fixture: ComponentFixture<DarkModeToggleComponent>;
    let component: DarkModeToggleComponent;

    let store: Store<ThemeSwitcherState>;

    beforeEach(waitForAsync(async () => {

        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatSlideToggleModule,
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducer
                }, {
                    runtimeChecks: {
                        strictStateSerializability: true,
                        strictStateImmutability: true,
                        strictActionSerializability: true,
                        strictActionImmutability: true
                    }
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

        store = TestBed.inject(Store);

    }));

    it("should create", () => {
        expect(component)
            .toBeDefined();
    });

    it(`toggleDarkMode should dispatch toggleDarkMode`, () => {

        const spy = spyOn(store, "dispatch") as ActionSpy;

        component.toggleDarkMode();

        expect(spy)
            .toHaveBeenCalledWith(toggleDarkMode());

    });

});
