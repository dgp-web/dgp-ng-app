import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { first } from "rxjs/operators";
import { AuthenticationApiClient } from "../api-clients/authentication.api-client";
import { InitializationService } from "../services/initialization.service";
import { DgpAuthenticationModule } from "../authentication.module";
import {
    getAuthenticatedUserSelector, getCachedInitialUrlSelector, getIsAuthenticatedSelector, hasCachedInitialUrlSelector
} from "./authentication.selectors";

interface TestUser {
    label: string;
}

const testUser: TestUser = {label: ""};
const testError: Error = {message: "", name: ""};

class TestAuthenticationApiClient implements AuthenticationApiClient<TestUser> {
    authenticate$(): Promise<TestUser> {
        return Promise.resolve(testUser);
    }
}

class TestInitializationService implements InitializationService<TestUser> {
    runPostAuthenticationTask$(user: TestUser): Promise<void> {
        return Promise.resolve();
    }
}


describe("authentication selectors", () => {

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
                DgpAuthenticationModule.forRoot({
                    authenticationApiClientProvider: {
                        provide: AuthenticationApiClient,
                        useClass: TestAuthenticationApiClient
                    },
                    initializationServiceProvider: {
                        provide: InitializationService,
                        useClass: TestInitializationService
                    }
                })
            ]
        });

        store = TestBed.get(Store);

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
