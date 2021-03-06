import { authenticationReducer, initialAuthenticationState } from "./reducers";
import { AuthenticationState } from "./models";
import { authenticateUser, cacheInitialUrl, registerAuthenticateError } from "./actions";

describe("authenticationReducer", () => {

    it(`authenticateUser should set user to the action's payload and success to true`, () => {

        const user = {};
        const action = authenticateUser({user});

        const state = authenticationReducer(initialAuthenticationState, action);

        const expectedState: AuthenticationState = {
            ...initialAuthenticationState,
            user,
            success: true
        };

        expect(state)
            .toEqual(expectedState);

    });

    it(`cacheInitialUrl should set initialUrl to the action's payload`, () => {

        const initialUrl = "";
        const action = cacheInitialUrl({initialUrl});

        const state = authenticationReducer(initialAuthenticationState, action);

        const expectedState: AuthenticationState = {
            ...initialAuthenticationState,
            initialUrl
        };

        expect(state)
            .toEqual(expectedState);

    });

    it(`registerAuthenticateError should set error to the action's payload and success to false`, () => {

        const error = {};
        const action = registerAuthenticateError({error});

        const state = authenticationReducer(initialAuthenticationState, action);

        const expectedState: AuthenticationState = {
            ...initialAuthenticationState,
            error,
            success: false
        };

        expect(state)
            .toEqual(expectedState);

    });
});
