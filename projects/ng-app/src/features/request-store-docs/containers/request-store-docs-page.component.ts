import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
    hasPendingRequestsSelectorCodeSample,
    moduleImportCodeSample,
    scheduleRequestActionCodeSample
} from "../request-store-code-samples";

@Component({
    selector: "dgp-request-store-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Request store
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Request store</dgp-docs-chapter-title>

                <p>
                    A request queue that allows to dispatch requests as actions.
                    <br>
                    Useful for tracking whether your application has pending requests.
                </p>

                <dgp-docs-section-title>
                    1: Import DgpRequestStoreModule into an application using @ngrx/store
                    and @ngrx/effects.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Wrap your Promise-based or Observable-based requests in ScheduleRequestAction.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="scheduleRequestActionCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    3: Use hasPendingRequestsSelector to check for running requests.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="hasPendingRequestsCode"></dgp-docs-code-block>

                <p>
                    Tip: The dgp-page-header component uses hasPendingRequestsSelector internally
                    and displays an unobtrusive progress bar at the top of the page.
                </p>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [
        ``
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestStoreDocsPageComponent {

    readonly moduleImportCode = moduleImportCodeSample;
    readonly scheduleRequestActionCode = scheduleRequestActionCodeSample;
    readonly hasPendingRequestsCode = hasPendingRequestsSelectorCodeSample;

}
