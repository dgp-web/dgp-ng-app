import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoxGroup } from "../../../../../../dgp-ng-charts/src/lib/models";

@Component({
    selector: "dgp-charts-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-box-plot [model]="boxGroups"
                      chartTitle="Chart title"
                      yAxisTitle="y axis"
                      xAxisTitle="x axis"></dgp-box-plot>
        
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        dgp-line-chart, dgp-box-plot {
            height: 100%;
            width: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsLabsComponent {

    readonly boxGroups: ReadonlyArray<BoxGroup> = [{
        value: "first",
        boxGroupId: "first",
        boxes: [{
            boxId: "first01",
            quantiles: {
                min: 1,
                lower: 2.25,
                median: 5.5,
                upper: 6.75,
                max: 10
            },
            outliers: [
                17, 18
            ],
            colorHex: "#3000f0"
        }, {
            boxId: "first02",
            quantiles: {
                min: 2,
                lower: 3.25,
                median: 5,
                upper: 6,
                max: 9
            },
            outliers: [
                -2, -1, 14
            ],
            colorHex: "#309000"
        }],
        label: "First group"
    }];

}
