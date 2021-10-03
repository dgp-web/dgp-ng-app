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
            Connected scatter plot
        </dgp-page-header>

        <dgp-split-panel orientation="horizontal">

            <dgp-split-panel-content [size]="80">
                <ng-template>
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


                </ng-template>

            </dgp-split-panel-content>
            <dgp-split-panel-content [size]="20">
                <ng-template>

                    <dgp-inspector>
                        <dgp-inspector-section label="General">
                            <dgp-inspector-item label="Chart title"
                                                matIconName="label">
                                <mat-form-field>
                                    <textarea matInput
                                              [ngModel]="model.chartTitle"
                                              (ngModelChange)="updateChartTitle($event)"></textarea>
                                </mat-form-field>
                            </dgp-inspector-item>
                        </dgp-inspector-section>

                        <dgp-inspector-section label="x axis"
                                               matIconName="border_bottom">
                            <dgp-inspector-item label="Title"
                                                matIconName="label">
                                <mat-form-field>
                                    <textarea matInput
                                              [ngModel]="model.xAxisTitle"
                                              (ngModelChange)="updateXAxisTitle($event)"></textarea>
                                </mat-form-field>
                            </dgp-inspector-item>
                        </dgp-inspector-section>

                        <dgp-inspector-section label="y axis"
                                               matIconName="border_left">
                            <dgp-inspector-item label="Title"
                                                matIconName="label">
                                <mat-form-field>
                                    <textarea matInput
                                              [ngModel]="model.yAxisTitle"
                                              (ngModelChange)="updateYAxisTitle($event)"></textarea>
                                </mat-form-field>
                            </dgp-inspector-item>
                        </dgp-inspector-section>

                    </dgp-inspector>

                </ng-template>
            </dgp-split-panel-content>

        </dgp-split-panel>

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
            max-height: 100%;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotLabsComponent extends DgpModelEditorComponentBase<ConnectedScatterPlot> {

    protected modelValue = testConnectScatterPlot;

    updateChartTitle(chartTitle: string) {
        this.updateModel({chartTitle});
    }

    updateXAxisTitle(xAxisTitle: string) {
        this.updateModel({xAxisTitle});
    }


    updateYAxisTitle(yAxisTitle: string) {
        this.updateModel({yAxisTitle});
    }
}
