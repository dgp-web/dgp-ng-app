import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { first } from "rxjs/operators";
import { themeSwitcherReducer } from "./reducers";
import { themeSwitcherStoreFeature } from "./theme-switcher-store-feature.model";
import { isDarkModeActiveSelector } from "./selectors";

describe("theme-switcher selectors", () => {

    let store: Store<any>;

    beforeEach(async(async () => {

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducer
                }, {
                    runtimeChecks: {
                        strictActionImmutability: true,
                        strictActionSerializability: true,
                        strictStateImmutability: true,
                        strictStateSerializability: true
                    }
                })
            ]
        });

        store = TestBed.inject(Store);

    }));

    it(`isDarkModeActiveSelector should return whether dark mode is active`, async () => {

        const isDarkModeActive = await store.select(isDarkModeActiveSelector)
            .pipe(first())
            .toPromise();

        expect(isDarkModeActive).toBeFalsy();

    });

});
