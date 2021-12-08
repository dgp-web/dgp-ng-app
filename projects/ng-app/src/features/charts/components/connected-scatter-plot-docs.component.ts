import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-connected-scatter-plot-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Connected scatterplot
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Connected scatterplot</dgp-docs-chapter-title>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotDocsComponent {

}
