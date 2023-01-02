import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";
import { ThemeSwitcherEffects } from "./effects";
import { defaultThemeSwitcherConfig, THEME_SWITCHER_CONFIG, ThemeSwitcherState, themeSwitcherStoreFeature } from "./models";
import { themeSwitcherReducer } from "./reducers";

describe(ThemeSwitcherEffects.name, () => {

    let store: Store<ThemeSwitcherState>;
    let effects: ThemeSwitcherEffects;
    let metadata: EffectsMetadata<ThemeSwitcherEffects>;

    beforeEach(waitForAsync(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducer
                }, {
                    runtimeChecks: {
                        strictStateSerializability: true,
                        strictStateImmutability: true,
                        strictActionSerializability: true,
                        strictActionImmutability: true
                    }
                }),
                EffectsModule.forRoot([ThemeSwitcherEffects])
            ],
            providers: [{
                provide: THEME_SWITCHER_CONFIG,
                useValue: defaultThemeSwitcherConfig
            }]
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
