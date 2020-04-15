import { async, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { first } from "rxjs/operators";
import { RouterStateSnapshot } from "@angular/router";
import { AuthenticationGuard } from "./authentication.guard";
import { getCachedInitialUrlSelector, hasCachedInitialUrlSelector } from "../selectors";
import { configureAuthenticationTestingModule } from "../test";

describe("authentication selectors", () => {

    let store: Store<any>;
    let guard: AuthenticationGuard;

    beforeEach(async(async () => {

        await configureAuthenticationTestingModule();

        store = TestBed.inject(Store);
        guard = TestBed.inject(AuthenticationGuard);

    }));

    it("canActivate should should cache the initialUrl if it has not been already cached.", async () => {

        const snapshot: Partial<RouterStateSnapshot> = {url: ""};

        let hasCachedInitialUrl = await store.select(hasCachedInitialUrlSelector)
            .pipe(first())
            .toPromise();

        expect(hasCachedInitialUrl)
            .toBeFalsy();

        await guard.canActivate(null, snapshot as RouterStateSnapshot);

        hasCachedInitialUrl = await store.select(hasCachedInitialUrlSelector)
            .pipe(first())
            .toPromise();

        expect(hasCachedInitialUrl)
            .toBeTruthy();

        const cachedInitialUrl = await store.select(getCachedInitialUrlSelector)
            .pipe(first())
            .toPromise();

        expect(cachedInitialUrl)
            .toBe(snapshot.url);

    });

});
