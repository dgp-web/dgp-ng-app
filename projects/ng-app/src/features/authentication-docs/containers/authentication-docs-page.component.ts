import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChildren } from "@angular/core";

declare var hljs;

@Component({
    selector: "dgp-authentication-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Authentication
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <h1>Authentication</h1>

                <p>
                    Helps setup the plumbing for authenticating a user and performing a set of tasks
                    afterwards before the application opens.
                    <br>
                    Useful for downloading basic data needed for your application for instance.
                </p>

                <h2>1: Implement AuthenticationApiClient.</h2>

                <div style="width: 100%;">
                        <pre><code [innerHTML]="authenticationClientCode"
                                   class="language-typescript"></code></pre>
                </div>

                <h2>2: Implement InitializationService.</h2>

                <div style="width: 100%;">
                        <pre><code [innerHTML]="initializationServiceCode"
                                   class="language-typescript"></code></pre>
                </div>

                <h2>3: Import DgpAuthenticationModule.forRoot(...) in your main module.</h2>

                <div style="width: 100%;">
                        <pre><code [innerHTML]="moduleImportCode"
                                   class="language-typescript"></code></pre>
                </div>


            </dgp-docs-page-content>


        </dgp-docs-page>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthenticationDocsPageComponent implements AfterViewInit {
    readonly authenticationClientCode = `
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

    readonly initializationServiceCode = `
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

    readonly moduleImportCode = `
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

    ngAfterViewInit(): void {

        const el = document.querySelectorAll("pre code")
            .forEach((value, key, parent) => {
                hljs.highlightBlock(value);
            });
    }

}
