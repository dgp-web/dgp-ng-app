import { ChangeDetectionStrategy, Component } from "@angular/core";
import { byUnique, createGuid, DgpModelEditorComponentBase } from "dgp-ng-app";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlot,
    ConnectedScatterPlotRenderer,
    createNormalInterpolator,
    Dot,
    getGaussianQuantile,
    getMedianRank
} from "dgp-ng-charts";
import {
    connectedScatterPlotMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/connected-scatter-plot-metadata.constant";
import * as d3 from "d3";
import * as _ from "lodash";
import { Many } from "data-modeling";

/**
 * Helper function to compute parameter sigma2 for the Normal
 */
export function computeVariance(data: Many<number>, mu: number) {
    let sumOfSquaredDiffs = 0;
    const n = data.length;
    for (let i = 0; i < n; i++) {
        const squaredDiff = Math.pow(data[i] - mu, 2);
        sumOfSquaredDiffs += squaredDiff;
    }
    return sumOfSquaredDiffs / n;
}

export function fitNormalDistribution(data: Many<number>): { readonly mu: number; readonly variance: number; } {
    const mu = d3.median(data);
    const sigma2 = computeVariance(data, mu);
    return {mu, variance: sigma2};
}

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
        dotSize: 8
    } as ConnectedScatterPlot;

    updateRenderer(renderer: ConnectedScatterPlotRenderer) {
        this.renderer = renderer;
    }

}

const rdm = d3.randomNormal(0, 1);
const values = _.sortBy(Array.from({length: 100}, (x, i) => rdm()));


const result = fitNormalDistribution(values);
const median = result.mu;
const variance = result.variance;

const dots = values.map((x, index) => {

    const p = getMedianRank({
        i: index + 1,
        n: values.length
    }) * 100;

    const y = p;

    return {x, y} as Dot;

});

const minP = d3.min(dots.map(x => x.y)) / 100;
const maxP = d3.max(dots.map(x => x.y)) / 100;

const quantileMin = getGaussianQuantile({
    variance, median, p: minP
});
const quantileMax = getGaussianQuantile({
    variance, median, p: maxP
});

const fittedLine: Many<Dot> = [{
    x: quantileMin,
    y: minP * 100
}, {
    x: quantileMax,
    y: maxP * 100
}];

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

const pValues = [
    ...dots.map(x => x.y / 100),
    ...fittedLine.map(x => x.y / 100)
].filter(byUnique);

const yAxisInterpolator = createNormalInterpolator({
    pValues
});
