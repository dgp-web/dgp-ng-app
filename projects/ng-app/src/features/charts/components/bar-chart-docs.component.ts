import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ModelMetadata } from "data-modeling";
import { BarChart } from "dgp-ng-charts";

export const barChartMetadata: ModelMetadata<BarChart, any> = {
    label: "Bar chart",
    description: "Express data with bars.",
    icon: "bar_chart",
    attributes: {
        chartTitle: {
            label: "Chart title",
            description: "The label of this chart, depicted above the actual data visualization",
            isRequired: false,
            isSecret: false,
            icon: "label"
        },
        xAxisTitle: {
            label: "x-axis title",
            description: "The label of the horizontal axis, depicted below the actual data visualization",
            isRequired: false,
            isSecret: false,
            icon: "border_bottom"
        },
        yAxisTitle: {
            label: "y-axis title",
            description: "The label of the vertical axis, depicted to the left of the actual data visualization",
            isRequired: false,
            isSecret: false,
            icon: "border_left"
        },
        model: {
            label: "Model",
            description: "A set of bar groups, the model of the bar chart",
            icon: "equalizer",
            isRequired: true,
            min: 0
        }
    }
};

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

                <dgp-model-description [model]="barChartMetadata"></dgp-model-description>
            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartDocsComponent {

    readonly barChartMetadata = barChartMetadata;

}
