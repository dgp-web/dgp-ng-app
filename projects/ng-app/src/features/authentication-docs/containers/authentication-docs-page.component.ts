import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChildren } from "@angular/core";

declare var hljs;

@Component({
    selector: "dgp-authentication-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Authentication
        </dgp-page-header>

        <div>
            <pre><code [innerHTML]="code"
                       class="language-typescript"></code></pre>
        </div>
    `,
    styles: [
            ``
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthenticationDocsPageComponent implements AfterViewInit {
    readonly code = `
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


    ngAfterViewInit(): void {

        const el = document.querySelectorAll("pre code")
            .forEach((value, key, parent) => {
                hljs.highlightBlock(value);
            });
    }

}
