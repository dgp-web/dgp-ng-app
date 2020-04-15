import { TestBed, TestBedStatic } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { DgpAuthenticationModule } from "./authentication.module";
import { AuthenticationApiClient } from "./api-clients/authentication.api-client";
import { InitializationService } from "./services/initialization.service";
import { RouterTestingModule } from "@angular/router/testing";

export interface TestUser {
    readonly label: string;
}

export const testUser: TestUser = {label: ""};
export const testError: Error = {message: "", name: ""};

export class TestAuthenticationApiClient implements AuthenticationApiClient<TestUser> {
    authenticate$(): Promise<TestUser> {
        return Promise.resolve(testUser);
    }
}

export class TestInitializationService implements InitializationService<TestUser> {
    runPostAuthenticationTask$(user: TestUser): Promise<void> {
        return Promise.resolve();
    }
}

export function configureAuthenticationTestingModule(): TestBedStatic {
    return TestBed.configureTestingModule({
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
}
