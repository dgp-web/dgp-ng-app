import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-heatmap-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Heatmap
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Heatmap</dgp-docs-chapter-title>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapDocsComponent {

}
