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
export class EmptyStatePageComponent {

    readonly moduleImportCodeSample = moduleImportCodeSample;
    readonly templateCodeSample = templateCodeSample;

}
