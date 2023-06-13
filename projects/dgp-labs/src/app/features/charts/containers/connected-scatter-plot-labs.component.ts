import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { ConnectedScatterPlot, ConnectedScatterPlotConfig, ConnectedScatterPlotRenderer, createNormalPlot } from "dgp-ng-charts";
import { connectedScatterPlotMetadata } from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants";
import { createTestNormalPlotScatterGroup } from "../../../__tests__/functions/create-test-normal-plot-scatter-group.function";

@Component({
    selector: "dgp-connected-scatter-plot-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            {{cspMetadata.label}}
        </dgp-page-header>

        <dgp-docking-layout>
            <dgp-docking-layout-item type="row">

                <dgp-docking-layout-item type="column"
                                         width="80">
                    <dgp-docking-layout-container label="Plot">
                        <ng-template>
                            <dgp-connected-scatter-plot [model]="model.model"
                                                        [renderer]="renderer"
                                                        [chartTitle]="model.chartTitle"
                                                        [xAxisTitle]="model.xAxisTitle"
                                                        [xAxisMin]="model.xAxisMin"
                                                        [xAxisMax]="model.xAxisMax"
                                                        [xAxisStep]="model.xAxisStep"
                                                        [xAxisTickFormat]="model.xAxisTickFormat"
                                                        [xAxisScaleType]="model.xAxisScaleType"
                                                        [showXAxisGridLines]="model.showXAxisGridLines"
                                                        [showDataAreaOutline]="true"
                                                        [yAxisTitle]="model.yAxisTitle"
                                                        [yAxisScaleType]="model.yAxisScaleType"
                                                        [yAxisMin]="model.yAxisMin"
                                                        [yAxisMax]="model.yAxisMax"
                                                        [yAxisStep]="model.yAxisStep"
                                                        [yAxisInterpolator]="model.yAxisInterpolator"
                                                        [yAxisTickValues]="model.yAxisTickValues"
                                                        [yAxisTickFormat]="model.yAxisTickFormat"
                                                        [showYAxisGridLines]="model.showYAxisGridLines"
                                                        [controlLines]="model.controlLines"
                                                        [dotSize]="model.dotSize"
                                                        [lineWidth]="model.lineWidth"></dgp-connected-scatter-plot>
                        </ng-template>

                    </dgp-docking-layout-container>
                </dgp-docking-layout-item>

                <dgp-docking-layout-item type="column"
                                         width="20">
                    <dgp-docking-layout-container label="Config">
                        <ng-template>
                            <dgp-inspector class="--dynamic-form-fields"
                                           [responsive]="true">
                                <dgp-inspector-item label="Renderer"
                                                    matIconName="label">
                                    <dgp-connected-scatter-plot-renderer-select
                                            [disabled]="disabled"
                                            [model]="renderer"
                                            (modelChange)="updateRenderer($event)"></dgp-connected-scatter-plot-renderer-select>
                                </dgp-inspector-item>

                                <dgp-inspector-item label="Items"
                                                    matIconName="pin">

                                    <input type="number"
                                           [ngModel]="n"
                                           (ngModelChange)="updateN($event)">

                                </dgp-inspector-item>

                            </dgp-inspector>

                            <dgp-connected-scatter-plot-config [model]="model"
                                                               (modelChange)="setPlot($event)"></dgp-connected-scatter-plot-config>
                        </ng-template>
                    </dgp-docking-layout-container>
                </dgp-docking-layout-item>

            </dgp-docking-layout-item>
        </dgp-docking-layout>

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotLabsComponent extends DgpModelEditorComponentBase<ConnectedScatterPlot> {

    readonly cspMetadata = connectedScatterPlotMetadata;

    renderer = ConnectedScatterPlotRenderer.Hybrid;

    n = 121;

    group = createTestNormalPlotScatterGroup({n: this.n});
    model = createNormalPlot({model: [this.group]});

    updateRenderer(renderer: ConnectedScatterPlotRenderer) {
        this.renderer = renderer;
    }

    setPlot(payload: ConnectedScatterPlotConfig) {
        const model = createNormalPlot({model: [this.group]}, payload);
        this.setModel(model);
    }

    updateN(n: number) {
        this.group = createTestNormalPlotScatterGroup({n: this.n});
        const model = createNormalPlot({model: [this.group]}, this.model);
        this.setModel(model);
        this.n = n;
    }

}

