import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { DgpThemeSwitcherModule, isDarkModeActiveSelector } from "dgp-ng-app";
import { first } from "rxjs/operators";

describe("theme-switcher selectors", () => {

    let store: Store<any>;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictActionImmutability: true,
                        strictActionSerializability: true,
                        strictStateImmutability: true,
                        strictStateSerializability: true
                    }
                }),
                DgpThemeSwitcherModule.forRoot()
            ]
        });

        store = TestBed.get(Store);

    }));

    it(`isDarkModeActiveSelector should return whether dark mode is active`, async () => {

        const isDarkModeActive = await this.store.select(isDarkModeActiveSelector)
            .pipe(first())
            .toPromise();

        expect(isDarkModeActive)
            .toBeTruthy();

    });

});
