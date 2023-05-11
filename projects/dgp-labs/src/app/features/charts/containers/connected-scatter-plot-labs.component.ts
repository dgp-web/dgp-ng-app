import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { ConnectedScatterPlot, ConnectedScatterPlotRenderer } from "dgp-ng-charts";
import { testConnectedScatterPlot } from "../../../__tests__/constants/test-connected-scatter-plot.constant";
import {
    connectedScatterPlotMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/connected-scatter-plot-metadata.constant";

/**
 * References
 * - https://de.wikipedia.org/wiki/Normalverteilung
 * - https://en.wikipedia.org/wiki/Normal_distribution
 */
export function getGaussianProbabilityDensity(payload: {
    readonly x: number;
    readonly median: number;
    readonly variance: number;
}): number {

    const x = payload.x;

    const median = payload.median;
    const variance = payload.variance;

    const scale = Math.sqrt(variance);

    return 1 / Math.sqrt(2 * Math.PI * variance) * Math.exp(-1 / 2 * (((x - median) / scale) ** 2));

}

/**
 * References
 * - https://stackoverflow.com/questions/1906064/gauss-error-function-implementation-for-javascript
 */
export function getGaussianError(x: number) {
    let z: number;
    const ERF_A = 0.147;
    let theSignOfX: number;
    if (0 === x) {
        theSignOfX = 0;
        return 0;
    } else if (x > 0) {
        theSignOfX = 1;
    } else {
        theSignOfX = -1;
    }

    const one_plus_axsqrd = 1 + ERF_A * x * x;
    const four_ovr_pi_etc = 4 / Math.PI + ERF_A * x * x;
    let ratio = four_ovr_pi_etc / one_plus_axsqrd;
    ratio *= x * -x;
    const expofun = Math.exp(ratio);
    const radical = Math.sqrt(1 - expofun);
    z = radical * theSignOfX;
    return z;
}

export function getGaussianCumulativeDistribution(payload: {
    readonly x: number;
    readonly median: number;
    readonly variance: number;
}): number {
    const x = payload.x;

    const median = payload.median;
    const variance = payload.variance;

    return 1 / 2 * (1 + getGaussianError((x - median) / Math.sqrt(2 * variance)));

}

/**
 * References
 * - https://stackoverflow.com/questions/12556685/is-there-a-javascript-implementation-of-the-inverse-error-function-akin-to-matl
 */
export function getInverseGaussianError(x: number): number {
    let z: number;
    const a = 0.147;
    let the_sign_of_x;
    if (0 == x) {
        the_sign_of_x = 0;
    } else if (x > 0) {
        the_sign_of_x = 1;
    } else {
        the_sign_of_x = -1;
    }

    if (0 !== x) {
        const ln_1minus_x_sqrd = Math.log(1 - x * x);
        const ln_1minusxx_by_a = ln_1minus_x_sqrd / a;
        const ln_1minusxx_by_2 = ln_1minus_x_sqrd / 2;
        const ln_etc_by2_plus2 = ln_1minusxx_by_2 + (2 / (Math.PI * a));
        const first_sqrt = Math.sqrt((ln_etc_by2_plus2 * ln_etc_by2_plus2) - ln_1minusxx_by_a);
        const second_sqrt = Math.sqrt(first_sqrt - ln_etc_by2_plus2);
        z = second_sqrt * the_sign_of_x;
    } else { // x is zero
        z = 0;
    }
    return z;
}

/**
 * The quantile function is the inverse of the CDF function
 *
 * References
 * - https://en.wikipedia.org/wiki/Normal_distribution
 * - https://en.wikipedia.org/wiki/Probit
 */
export function getGaussianQuantile(payload: {
    readonly median: number;
    readonly variance: number;
    readonly p: number;
}) {
    const median = payload.median;
    const variance = payload.variance;
    const scale = Math.sqrt(variance);

    const p = payload.p;

    return median + scale * Math.sqrt(2) * getInverseGaussianError(2 * p - 1);
}

export function getMedianRank(payload: {
    /**
     * Rank of the smallest value, start at 1
     */
    readonly i: number;
    /**
     * Sample size
     */
    readonly n: number;
}) {
    const i = payload.i;
    const n = payload.n;

    return (i - 0.3) / (n + 0.4);
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
    model = testConnectedScatterPlot;

    updateRenderer(renderer: ConnectedScatterPlotRenderer) {
        this.renderer = renderer;
    }

}
