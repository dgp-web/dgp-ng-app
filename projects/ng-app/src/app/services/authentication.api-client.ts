import { ClassProvider, Injectable } from "@angular/core";
import { AuthenticationApiClient } from "dgp-ng-app";
import { AuthenticationResult } from "../../models";

@Injectable()
export class AuthenticationApiClientImpl implements AuthenticationApiClient {

    authenticate$(): Promise<AuthenticationResult> {
        console.log("Authenticate");
        return Promise.resolve({} as AuthenticationResult);
    }

}

export const authenticationApiClientProvider: ClassProvider = {
    provide: AuthenticationApiClient,
    useClass: AuthenticationApiClientImpl
};
