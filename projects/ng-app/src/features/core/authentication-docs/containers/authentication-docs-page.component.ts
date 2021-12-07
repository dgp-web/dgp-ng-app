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

                <dgp-docs-chapter-title>Authentication</dgp-docs-chapter-title>

                <p>
                    Helps setup the plumbing for authenticating a user and performing a set of tasks
                    afterwards before the application opens.
                </p>

                <p>
                    Useful for downloading basic data needed for your application for instance.
                </p>

                <dgp-docs-section-title>1: Implement AuthenticationApiClient.</dgp-docs-section-title>

                <dgp-docs-code-block [code]="authenticationClientCode"></dgp-docs-code-block>

                <dgp-docs-section-title>2: Implement InitializationService.</dgp-docs-section-title>

                <dgp-docs-code-block [code]="initializationServiceCode"></dgp-docs-code-block>

                <dgp-docs-section-title>3: Import DgpAuthenticationModule.forRoot(...) in your main module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCode"></dgp-docs-code-block>

            </dgp-docs-page-content>


        </dgp-docs-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthenticationDocsPageComponent {

    readonly authenticationClientCode = authenticationClientCodeSample;
    readonly initializationServiceCode = initializationClientCodeSample;
    readonly moduleImportCode = moduleImportCodeSample;

}
