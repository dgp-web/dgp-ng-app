import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-bar-chart-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Bar chart
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Bar chart</dgp-docs-chapter-title>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartDocsComponent {

}
