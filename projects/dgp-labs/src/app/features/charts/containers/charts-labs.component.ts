import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoxGroup } from "../../../../../../dgp-ng-charts/src/lib/models";

@Component({
    selector: "dgp-charts-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <div>
            <!--<dgp-line-chart></dgp-line-chart>-->
            <dgp-box-plot [model]="boxGroups"></dgp-box-plot>
        </div>
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
            height: 400px;
            width: 400px;
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
            boxValuesId: "first01Values",
            quantiles: {
                min: 1,
                lower: 2.25,
                median: 5.5,
                upper: 6.75,
                max: 10
            },
            outliers: [
                17, 18
            ]
        }],
        label: "First"
    }];

}
