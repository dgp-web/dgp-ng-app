import { ChangeDetectionStrategy, Component } from "@angular/core";
import { byUnique, createGuid, DgpModelEditorComponentBase } from "dgp-ng-app";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlot,
    ConnectedScatterPlotRenderer,
    createWeibullInterpolator,
    Dot,
    getMedianRank,
    getWeibullQuantile,
    ScaleType
} from "dgp-ng-charts";
import {
    connectedScatterPlotMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/connected-scatter-plot-metadata.constant";
import * as d3 from "d3";
import * as _ from "lodash";
import { Many } from "data-modeling";
import * as regression from "regression";
import * as weibull from "@stdlib/random-base-weibull";

/**
 * Helper function to compute parameter sigma2 for the Normal
 */
export function estimateVariance(data: Many<number>, mu: number) {
    let sumOfSquaredDiffs = 0;
    const n = data.length;
    for (let i = 0; i < n; i++) {
        const squaredDiff = Math.pow(data[i] - mu, 2);
        sumOfSquaredDiffs += squaredDiff;
    }
    return sumOfSquaredDiffs / n;
}


/**
 * Resources: https://www.npmjs.com/package/distfitjs
 */
export function fitNormalDistribution(data: Many<number>): { readonly mu: number; readonly variance: number; } {
    const mu = d3.median(data);
    const sigma2 = estimateVariance(data, mu);
    return {mu, variance: sigma2};
}

/**
 * https://www.mbfys.ru.nl/~robvdw/CNP04/LAB_ASSIGMENTS/LAB05_CN05/MATLAB2007b/stats/html/cdffitdemo.html#9
 */

/*
To fit a Weibull distribution to these data, notice that the CDF for the
Weibull is p = Pr{X <= x} = 1 - exp(-(x/a)^b).
Transforming that to log(a) + log(-log(1-p))*(1/b) = log(x) again gives a
linear relationship, this time between log(-log(1-p)) and log(x).
We can use least squares to fit a straight line on the transformed scale
using p and x from the ECDF, and the slope and intercept of that line lead
to estimates of a and b.

logx = log(x);
logy = log(-log(1 - p));
poly = polyfit(logy,logx,1);
paramHat = [exp(poly(2)) 1/poly(1)]*/

/**
 * Resources: https://www.npmjs.com/package/distfitjs
 * https://www.mbfys.ru.nl/~robvdw/CNP04/LAB_ASSIGMENTS/LAB05_CN05/MATLAB2007b/stats/html/cdffitdemo.html#9
 */
export function fitWeibullDistribution(payload: {
    readonly x: Many<number>;
    readonly y: Many<number>;
}) {
    const x = payload.x;
    const y = payload.y;

    const tuples = y.map((yv, index) => [yv, x[index]]);

    const engine = regression.polynomial(tuples, {order: 1});

    const slope = engine.equation[0];
    const intercept = engine.equation[1];

    const scale = Math.exp(intercept);
    const shape = 1 / slope;

    return {scale, shape};

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
        dotSize: 8,
        xAxisScaleType: ScaleType.Logarithmic
    } as ConnectedScatterPlot;

    updateRenderer(renderer: ConnectedScatterPlotRenderer) {
        this.renderer = renderer;
    }

}

const originalScale = 2;
const originalShape = 1;

const rdm = weibull.factory(originalShape, originalScale);
// const rdm = d3.randomNormal(0, 1);
const values = _.sortBy(Array.from({length: 121}, (x, i) => rdm()));

const yValues = values.map((x, index) => {

    return getMedianRank({
        i: index + 1,
        n: values.length
    }) * 100;

});

const dots = values.map((x, index) => {

    const y = yValues[index];

    return {x, y} as Dot;

});

const fittedDist = fitWeibullDistribution({
    x: values,
    y: yValues.map(yv => yv / 100).map(yv => getWeibullQuantile({p: yv}))
});

const shape = fittedDist.shape;
const scale = fittedDist.scale;

const minP = d3.min(dots.map(x => x.y)) / 100;
const maxP = d3.max(dots.map(x => x.y)) / 100;

const quantileMin = getWeibullQuantile({
    shape, scale, p: minP
});

const quantileMax = getWeibullQuantile({
    shape, scale, p: maxP
});
/*

console.log(shape, scale);
console.log(originalShape, originalScale);

console.log(getWeibullQuantile({
    shape, scale, p: maxP
}));
console.log(getWeibullQuantile({
    shape: originalShape, scale: originalScale, p: maxP
}));
*/

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
    ...dots.map(x => x.y / 100)
].filter(byUnique);

const yAxisInterpolator = createWeibullInterpolator({
    pValues, scale: originalScale, shape: originalShape
});
