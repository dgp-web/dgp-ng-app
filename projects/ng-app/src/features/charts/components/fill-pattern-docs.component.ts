import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-fill-pattern-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Fill patterns
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Fill patterns</dgp-docs-chapter-title>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillPatternDocsComponent {

}
