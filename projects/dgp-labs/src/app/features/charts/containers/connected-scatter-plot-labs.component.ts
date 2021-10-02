import { ChangeDetectionStrategy, Component } from "@angular/core";
import { testConnectedScatterGroups } from "../constants/test-connected-scatter-groups.constant";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { ConnectedScatterPlot } from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/models";

export const testConnectScatterPlot: ConnectedScatterPlot = {
    model: testConnectedScatterGroups
};

@Component({
    selector: "dgp-connected-scatter-plot-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Connected scatter plot
                </dgp-docs-chapter-title>


                <dgp-connected-scatter-plot [model]="model.model"
                                            [chartTitle]="model.chartTitle"
                                            [xAxisTitle]="model.xAxisTitle"
                                            [xAxisMin]="model.xAxisMin"
                                            [xAxisMin]="model.xAxisMin"
                                            [xAxisMax]="model.xAxisMax"
                                            [yAxisTitle]="model.yAxisTitle"
                                            [yAxisScaleType]="model.yAxisScaleType"
                                            [yAxisMin]="model.yAxisMin"
                                            [yAxisMax]="model.yAxisMax"
                                            [controlLines]="model.controlLines"></dgp-connected-scatter-plot>

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

        dgp-connected-scatter-plot {
            width: 100%;
            max-height: 320px;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotLabsComponent extends DgpModelEditorComponentBase<ConnectedScatterPlot> {

    protected modelValue = testConnectScatterPlot;

}
