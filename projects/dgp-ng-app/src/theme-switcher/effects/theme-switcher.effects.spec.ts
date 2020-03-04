import { ThemeSwitcherEffects } from "dgp-ng-app/theme-switcher/effects/theme-switcher.effects";
import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { ThemeSwitcherState, themeSwitcherStoreFeature } from "dgp-ng-app";
import { themeSwitcherReducerImpl } from "dgp-ng-app/theme-switcher/reducers/theme-switcher.reducer";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";


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

        store = TestBed.get(Store);
        effects = TestBed.get(ThemeSwitcherEffects);
        metadata = getEffectsMetadata(effects);

    }));

    it(`should create`, () => {
        expect(effects)
            .toBeDefined();
    });

    it(`should register toggleDarkMode$ that doesn't dispatch an action.`, () => {
        expect(metadata.toggleDarkMode$)
            .toEqual({dispatch: false, resubscribeOnError: true});
    });

});
