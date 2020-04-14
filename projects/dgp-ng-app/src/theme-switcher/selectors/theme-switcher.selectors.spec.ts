import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { first } from "rxjs/operators";
import { isDarkModeActiveSelector, themeSwitcherStoreFeature } from "../../public-api";
import { themeSwitcherReducerImpl } from "../reducers/theme-switcher.reducer";

describe("theme-switcher selectors", () => {

    let store: Store<any>;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducerImpl
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

        store = TestBed.get(Store);

    }));

    it(`isDarkModeActiveSelector should return whether dark mode is active`, async () => {

        const isDarkModeActive = await store.select(isDarkModeActiveSelector)
            .pipe(first())
            .toPromise();

        expect(isDarkModeActive).toBeFalsy();

    });

});
