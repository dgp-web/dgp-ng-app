import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
    authenticationClientCodeSample,
    initializationClientCodeSample,
    moduleImportCodeSample
} from "../authentication-code-samples";

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

                <dgp-docs-code-block [code]="authenticationClientCode"></dgp-docs-code-block>

                <h2>2: Implement InitializationService.</h2>

                <dgp-docs-code-block [code]="initializationServiceCode"></dgp-docs-code-block>

                <h2>3: Import DgpAuthenticationModule.forRoot(...) in your main module.</h2>

                <dgp-docs-code-block [code]="moduleImportCode"></dgp-docs-code-block>

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

export class AuthenticationDocsPageComponent {

    readonly authenticationClientCode = authenticationClientCodeSample;
    readonly initializationServiceCode = initializationClientCodeSample;
    readonly moduleImportCode = moduleImportCodeSample;

}
