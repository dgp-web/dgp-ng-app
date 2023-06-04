import { Many } from "data-modeling";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotConfig } from "../../../connected-scatter-plot/models";
import { fromPercent } from "../from-percent.function";
import { createNormalYAxisTickValues } from "./create-normal-y-axis-tick-values.function";
import * as _ from "lodash";
import { getFittedNormalDistributionLine } from "./get-fitted-normal-distribution-line.function";
import { resolveConnectedScatterPlotConfig } from "./resolve-connected-scatter-plot-config.function";
import { computeTotalP } from "../compute-total-p.function";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";

import { createNormalInterpolatorWithBoundaries } from "./create-normal-interpolator-with-boundaries.function";

export function createNormalPlot(
    payload: {
        readonly model: Many<ConnectedScatterGroup>
    },
    config: ConnectedScatterPlotConfig = {}
): ConnectedScatterPlot {

    config = resolveConnectedScatterPlotConfig(config);

    let model = payload.model;

    let yAxisMin = config.yAxisMin;
    let yAxisMax = config.yAxisMax;

    const totalP = computeTotalP(model);

    const yAxisInterpolator = createNormalInterpolatorWithBoundaries({
        P: totalP,
        /**
         * pMin and pMax can be overridden which corresponds to zooming into the data
         */
        pMin: notNullOrUndefined(yAxisMin) ? fromPercent(yAxisMin) : undefined,
        pMax: notNullOrUndefined(yAxisMax) ? fromPercent(yAxisMax) : undefined,
    });

    /*const yAxisInterpolator = createNormalInterpolator({
        P: totalP,
    });*/

    if (isNullOrUndefined(yAxisMin)) yAxisMin = 0;
    if (isNullOrUndefined(yAxisMax)) yAxisMax = 100;

    const yAxisTickValues = createNormalYAxisTickValues({P: totalP});

    model = model.map(csg => {
        // TODO: Handle case for more than 1 series
        const refSeries = csg.series[0];

        const X = refSeries.dots.map(x => x.x);
        const P = refSeries.dots.map(x => x.y).map(fromPercent);

        return {
            ...csg,
            series: [
                csg.series[0],
                {
                    connectedScatterSeriesId: csg.connectedScatterGroupId + ".Fitted distribution",
                    showVertices: false,
                    showEdges: true,
                    dots: getFittedNormalDistributionLine({X, P, totalP})
                }
            ]
        };
    });

    const result: ConnectedScatterPlot = {
        yAxisInterpolator,
        yAxisMin,
        yAxisMax,
        model,
        showXAxisGridLines: true,
        showYAxisGridLines: true,
        dotSize: 8,
        // yAxisTickValues,
        /*yAxisTickFormat: (x: number) => {
            if (x >= 1 && x <= 95) return d3.format("d")(x);
            if (x > 95) return x.toPrecision(3);
            if (x < 1) return x.toPrecision(3);

            return;
        }*/
    };

    // TODO: This mergeing is crap
    return _.merge(result, config, {yAxisInterpolator, yAxisMin, yAxisMax});
}
