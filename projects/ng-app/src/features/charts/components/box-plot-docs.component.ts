import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Many } from "data-modeling";
import { BoxGroup } from "dgp-ng-charts";

@Component({
    selector: "dgp-box-plot-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Boxplot
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Boxplot</dgp-docs-chapter-title>

                <dgp-box-plot [model]="boxGroups"
                              style="width: 480px; height: 320px; flex-grow: 0; align-self: center"></dgp-box-plot>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxPlotDocsComponent {

    readonly boxGroups: Many<BoxGroup> = [{
        label: "Group",
        boxGroupId: "01",
        boxes: [{
            boxGroupId: "01",
            boxId: "01",
            quantiles: {
                max: 5,
                lower: 2,
                min: -1,
                median: 3,
                upper: 4
            },
            colorHex: "#ffffff",
            outliers: [10, -4]
        }]
    }];

}
