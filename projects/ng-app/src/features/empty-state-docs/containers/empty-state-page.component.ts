import { Component, ChangeDetectionStrategy } from "@angular/core";
import { moduleImportCodeSample, templateCodeSample } from "../empty-state-code-samples";

@Component({
    selector: "dgp-empty-state-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Empty state
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>Empty state</dgp-docs-chapter-title>

                <p>
                    Configurable placeholder for empty views.
                </p>

                <dgp-docs-section-title>1: Import DgpEmptyStateModule in your feature module.</dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCodeSample"></dgp-docs-code-block>

                <dgp-docs-section-title>2: Add the component to your template.</dgp-docs-section-title>

                <dgp-docs-code-block [code]="templateCodeSample"
                                     language="html"></dgp-docs-code-block>

                <dgp-docs-section-title>Demo</dgp-docs-section-title>

                <dgp-empty-state title="Empty state"
                                 matIconName="texture"
                                 style="min-height:320px;">
                    Configurable placeholder for empty views.
                </dgp-empty-state>


            </dgp-docs-page-content>

        </dgp-docs-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStatePageComponent {

    readonly moduleImportCodeSample = moduleImportCodeSample;
    readonly templateCodeSample = templateCodeSample;

}
