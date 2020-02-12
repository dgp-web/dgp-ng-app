import { AuthenticationService, AuthenticationServiceImpl } from "./authentication.service";
import { authenticateUser, AuthenticationApiClient, registerAuthenticateError } from "dgp-ng-app";
import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";

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

describe(AuthenticationService.name, () => {

    const authenticationApiClient = new TestAuthenticationApiClient();
    let store: Store<any>;

    let authenticationService: AuthenticationService<TestUser>;

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
                })
            ]
        });

        store = TestBed.get(Store);

        authenticationService = new AuthenticationServiceImpl<TestUser>(
            store, authenticationApiClient
        );
    }));

    it(`authenticationService.authenticate$() should call authenticationApiClient.authenticate$()`, async () => {

        spyOn(authenticationApiClient, "authenticate$")
            .and
            .callThrough();
        await authenticationService.authenticate$();
        expect(authenticationApiClient.authenticate$)
            .toHaveBeenCalled();

    });

    it(`should dispatch authenticateUser with the user returned from authenticationApiClient.authenticate$()`, async () => {

        spyOn(store, "dispatch");
        await authenticationService.authenticate$();
        expect(store.dispatch)
            .toHaveBeenCalledWith(authenticateUser({user: testUser}));

    });

    it(`should dispatch registerAuthenticateError with the error returned
    from authenticationApiClient.authenticate$() if this method throw an error`, async () => {

        spyOn(authenticationApiClient, "authenticate$")
            .and
            .returnValue(Promise.reject(testError));
        spyOn(store, "dispatch");
        await authenticationService.authenticate$();
        expect(store.dispatch)
            .toHaveBeenCalledWith(registerAuthenticateError({error: testError}));

    });

});
