import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { DgpThemeSwitcherModule, isDarkModeActiveSelector, themeSwitcherStoreFeature } from "dgp-ng-app";
import { first } from "rxjs/operators";
import { themeSwitcherReducerImpl } from "dgp-ng-app/theme-switcher/reducers/theme-switcher.reducer";

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
