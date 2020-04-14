import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";
import { ThemeSwitcherEffects } from "./theme-switcher.effects";
import { ThemeSwitcherState } from "../models/theme-switcher-state.model";
import { themeSwitcherStoreFeature } from "../models/theme-switcher-store-feature.model";
import { themeSwitcherReducerImpl } from "../reducers/theme-switcher.reducer";

describe(ThemeSwitcherEffects.name, () => {

    let store: Store<ThemeSwitcherState>;
    let effects: ThemeSwitcherEffects;
    let metadata: EffectsMetadata<ThemeSwitcherEffects>;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducerImpl
                }, {
                    runtimeChecks: {
                        strictStateSerializability: true,
                        strictStateImmutability: true,
                        strictActionSerializability: true,
                        strictActionImmutability: true
                    }
                }),
                EffectsModule.forRoot([ThemeSwitcherEffects])
            ]
        })
            .compileComponents();

        store = TestBed.inject(Store);
        effects = TestBed.inject(ThemeSwitcherEffects);
        metadata = getEffectsMetadata(effects);

    }));

    it(`should create`, () => {
        expect(effects)
            .toBeDefined();
    });

    it(`should register toggleDarkMode$ that doesn't dispatch an action.`, () => {
        expect(metadata.toggleDarkMode$)
            .toEqual({dispatch: false, useEffectsErrorHandler: true});
    });

});
