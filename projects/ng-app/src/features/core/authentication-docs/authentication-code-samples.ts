export const authenticationClientCodeSample = `
import { AuthenticationApiClient, AuthenticationApiClientProvider } from "dgp-ng-app";
import { AuthenticationResult } from "../models";

export class AuthenticationApiClientImpl implements AuthenticationApiClient {

    authenticate$(): Promise<AuthenticationResult> {
        return Promise.resolve({});
    }

}

export const authenticationApiClientProvider: AuthenticationApiClientProvider = {
    provide: AuthenticationApiClient,
    useClass: AuthenticationApiClientImpl
};
    `;

export const initializationClientCodeSample = `
import { InitializationService, InitializationServiceProvider } from "dgp-ng-app";
import { AuthenticationResult } from "../models";

export class InitializationServiceImpl implements InitializationService {

      runPostAuthenticationTask$(authenticationResult: AuthenticationResult): Promise<void> {
            return Promise.resolve();
        }

}

export const initializationServiceProvider: InitializationServiceProvider = {
    provide: InitializationService,
    useClass: AuthenticationApiClientImpl
};
    `;

export const moduleImportCodeSample = `
import { DgpAuthenticationModule } from "dgp-ng-app";
import {
    authenticationApiClientProvider,
    initializationServiceProvider
 } from "./services";


@NgModule({
    imports: [
        DgpAuthenticationModule.forRoot({
            authenticationApiClientProvider,
            initializationServiceProvider
        }),
        // ...
    ]
})
export class AppModule {}
    `;
