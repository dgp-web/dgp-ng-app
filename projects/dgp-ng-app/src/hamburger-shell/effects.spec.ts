import { HamburgerShellEffects } from "./effects";
import { TestBed } from "@angular/core/testing";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";
import { ReplaySubject } from "rxjs";
import { StoreModule } from "@ngrx/store";
import { defaultHamburgerShellConfig, HAMBURGER_SHELL_CONFIG, hamburgerShellStoreFeature } from "./models";
import { hamburgerShellReducer } from "./reducers";
import { provideMockActions } from "@ngrx/effects/testing";

describe(HamburgerShellEffects.name, () => {

    let effects: HamburgerShellEffects;
    let metadata: EffectsMetadata<HamburgerShellEffects>;
    let actions: ReplaySubject<any>;

    beforeEach(() => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [hamburgerShellStoreFeature]: hamburgerShellReducer
                }),
                EffectsModule.forRoot([
                    HamburgerShellEffects
                ]),
            ],
            providers: [
                provideMockActions(() => actions), {
                    provide: HAMBURGER_SHELL_CONFIG,
                    useValue: defaultHamburgerShellConfig
                }
            ]
        });

        effects = testBed.inject(HamburgerShellEffects);
        metadata = getEffectsMetadata(effects);

        actions = new ReplaySubject(1);

    });

    it(`should create`, () => {
        expect(effects)
            .toBeDefined();
    });

    it("should register setHamburgerMenuState$ that dispatches an action", () => {
        expect(metadata.setHamburgerMenuState$)
            .toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    // TODO

    it("should register setListDetailsPageLayout$ that dispatches an action", () => {
        expect(metadata.setListDetailsPageLayout$)
            .toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    // TODO
});
