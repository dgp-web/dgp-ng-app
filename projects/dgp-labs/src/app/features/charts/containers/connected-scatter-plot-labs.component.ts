import { ChangeDetectionStrategy, Component } from "@angular/core";
import { createGuid, DgpModelEditorComponentBase } from "dgp-ng-app";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlot,
    ConnectedScatterPlotRenderer,
    createWeibullInterpolator,
    Dot,
    getMedianRank
} from "dgp-ng-charts";
import {
    connectedScatterPlotMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/connected-scatter-plot-metadata.constant";
import * as _ from "lodash";
import * as weibull from "@stdlib/random-base-weibull";
import { getFittedWeibullDistributionLine } from "../../../../../../dgp-ng-charts/src/lib/shared/functions";


@Component({
    selector: "dgp-connected-scatter-plot-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            {{cspMetadata.label}}
        </dgp-page-header>

        <dgp-split-panel orientation="horizontal">

            <dgp-split-panel-content [size]="80">
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
                                                [showYAxisGridLines]="model.showYAxisGridLines"
                                                [controlLines]="model.controlLines"
                                                [dotSize]="model.dotSize"
                                                [lineWidth]="model.lineWidth"></dgp-connected-scatter-plot>
                </ng-template>

            </dgp-split-panel-content>
            <dgp-split-panel-content [size]="20">
                <ng-template>
                    <dgp-inspector class="--dynamic-form-fields"
                                   [responsive]="true">
                        <dgp-inspector-item label="Renderer"
                                            matIconName="label"
                                            description="Test">
                            <dgp-connected-scatter-plot-renderer-select
                                [disabled]="disabled"
                                [model]="renderer"
                                (modelChange)="updateRenderer($event)"></dgp-connected-scatter-plot-renderer-select>
                        </dgp-inspector-item>
                    </dgp-inspector>

                    <dgp-connected-scatter-plot-config [model]="model"
                                                       (modelChange)="setModel($event)"></dgp-connected-scatter-plot-config>
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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotLabsComponent extends DgpModelEditorComponentBase<ConnectedScatterPlot> {

    readonly cspMetadata = connectedScatterPlotMetadata;

    renderer = ConnectedScatterPlotRenderer.Hybrid;
    // model = testConnectedScatterPlot;
    model = {
        yAxisInterpolator,
        yAxisMin: 0,
        yAxisMax: 100,
        model: [group],
        showXAxisGridLines: true,
        showYAxisGridLines: true,
        dotSize: 8,
    } as ConnectedScatterPlot;

    updateRenderer(renderer: ConnectedScatterPlotRenderer) {
        this.renderer = renderer;
    }

}

const originalScale = 2;
const originalShape = 1;

const rdm = weibull.factory(originalShape, originalScale);

const X = _.sortBy(Array.from({length: 121}, (x, i) => rdm()).map(Math.log));

const pValues = X.map((x, index) => {

    return getMedianRank({
        i: index + 1,
        n: X.length
    });

});
const Y = pValues.map(x => x * 100);

const dots = X.map((x, index) => {
    const y = Y[index];
    return {x, y} as Dot;
});

const fittedLine = getFittedWeibullDistributionLine({X, Y});

const group: ConnectedScatterGroup = {

    connectedScatterGroupId: createGuid(),
    colorHex: "#00ff00",
    showEdges: true,
    showVertices: true,
    series: [{
        connectedScatterSeriesId: "Data",
        colorHex: "#00ff0066",
        showVertices: true,
        showEdges: false,
        dots
    }, {
        connectedScatterSeriesId: "Fitted distribution",
        colorHex: "#ff0000",
        showVertices: false,
        showEdges: true,
        dots: fittedLine
    }]
};

const yAxisInterpolator = createWeibullInterpolator({pValues});
