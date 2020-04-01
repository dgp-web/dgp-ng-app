import {
    AuthenticationApiClient, AuthenticationGuard,
    DgpAuthenticationModule, getAuthenticatedUserSelector, getCachedInitialUrlSelector, getIsAuthenticatedSelector, hasCachedInitialUrlSelector, InitializationService
} from "dgp-ng-app";
import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { first } from "rxjs/operators";
import { RouterStateSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

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
    let guard: AuthenticationGuard;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
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
        guard = TestBed.get(AuthenticationGuard);

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
