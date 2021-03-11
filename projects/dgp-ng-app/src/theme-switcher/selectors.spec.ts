import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { first } from "rxjs/operators";
import { themeSwitcherReducer } from "./reducers";
import { themeSwitcherStoreFeature } from "./models";
import { isDarkModeActiveSelector } from "./selectors";

describe("theme-switcher selectors", () => {

    let store: Store<any>;

    beforeEach(waitForAsync(async () => {

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [themeSwitcherStoreFeature]: themeSwitcherReducer
                })
            ]
        });

        store = TestBed.inject(Store);

    }));

    it(`isDarkModeActiveSelector should return whether dark mode is active`, async () => {

        const isDarkModeActive = await store.select(isDarkModeActiveSelector)
            .pipe(first())
            .toPromise();

        expect(isDarkModeActive)
            .toBeTruthy();

    });

});
