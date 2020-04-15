import { async, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { first } from "rxjs/operators";
import {
    getAuthenticatedUserSelector, getCachedInitialUrlSelector, getIsAuthenticatedSelector, hasCachedInitialUrlSelector
} from "./authentication.selectors";
import { configureAuthenticationTestingModule, testUser } from "../test";


describe("authentication selectors", () => {

    let store: Store<any>;

    beforeEach(async(async () => {
        await configureAuthenticationTestingModule();
        store = TestBed.inject(Store);
    }));

    it("getAuthenticatedUserSelector should return the authenticatedUser", async () => {

        const authenticatedUser = await store.select(getAuthenticatedUserSelector)
            .pipe(first())
            .toPromise();

        expect(authenticatedUser)
            .toBe(testUser);

    });

    it("getIsAuthenticatedSelector should return the authenticatedUser", async () => {

        const isAuthenticated = await store.select(getIsAuthenticatedSelector)
            .pipe(first())
            .toPromise();

        expect(isAuthenticated)
            .toBeTruthy();

    });

    it("hasCachedInitialUrlSelector should return whether there is an initialUrl", async () => {

        const hasCachedInitialUrl = await store.select(hasCachedInitialUrlSelector)
            .pipe(first())
            .toPromise();

        expect(hasCachedInitialUrl)
            .toBeFalsy();

    });

    it("getCachedInitialUrlSelector should return the cached initialUrl or null if there is none", async () => {

        const cachedInitialUrl = await store.select(getCachedInitialUrlSelector)
            .pipe(first())
            .toPromise();

        expect(cachedInitialUrl)
            .toBeNull();

    });

});
