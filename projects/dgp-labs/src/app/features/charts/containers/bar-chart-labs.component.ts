import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BarChart } from "dgp-ng-charts";

@Component({
    selector: "dgp-bar-chart-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Bar chart
                </dgp-docs-chapter-title>

                <dgp-bar-chart [model]="barChart.model"
                               [yAxisMin]="barChart.yAxisMin"></dgp-bar-chart>

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

        dgp-bar-chart {
            max-height: 400px;
            max-width: 800px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartLabsComponent {

    readonly barChart: BarChart = {
        yAxisMin: 0,
        model: [{
            barGroupKey: "barGroup01",
            label: "A group of bars",
            bars: [{
                barKey: "barGroup01.bar01",
                value: 5,
                colorHex: "#999999"
            }, {
                barKey: "barGroup01.bar02",
                value: 3,
                colorHex: "#999999"
            }]
        }]
    };

}
