import { AuthenticationService, AuthenticationServiceImpl } from "./authentication.service";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { authenticateUser, registerAuthenticateError } from "../actions";
import {
    configureAuthenticationTestingModule,
    TestAuthenticationApiClient,
    testError,
    TestUser,
    testUser
} from "../test";

describe(AuthenticationService.name, () => {

    const authenticationApiClient = new TestAuthenticationApiClient();
    let store: Store<any>;

    let authenticationService: AuthenticationService<TestUser>;

    beforeEach(waitForAsync(async () => {

        await configureAuthenticationTestingModule();

        store = TestBed.inject(Store);

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
