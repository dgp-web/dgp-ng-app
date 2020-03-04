import { ThemeSwitcherEffects } from "dgp-ng-app/theme-switcher/effects/theme-switcher.effects";
import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { ThemeSwitcherState, themeSwitcherStoreFeature } from "dgp-ng-app";
import { themeSwitcherReducerImpl } from "dgp-ng-app/theme-switcher/reducers/theme-switcher.reducer";
import { EffectsModule } from "@ngrx/effects";


describe(ThemeSwitcherEffects.name, () => {

    let store: Store<ThemeSwitcherState>;
    let effects: ThemeSwitcherEffects;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducerImpl
                }),
                EffectsModule.forRoot([ThemeSwitcherEffects])
            ]
        })
            .compileComponents();

        store = TestBed.get(Store);
        effects = TestBed.get(ThemeSwitcherEffects);

    }));

    it(`should create`, () => {
        expect(effects)
            .toBeDefined();
    });

});
