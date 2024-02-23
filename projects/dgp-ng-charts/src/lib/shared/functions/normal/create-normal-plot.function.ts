import { Many } from "data-modeling";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotConfig } from "../../../connected-scatter-plot/models";
import { fromPercent } from "../from-percent.function";
import { createNormalYAxisTickValues } from "./create-normal-y-axis-tick-values.function";
import * as _ from "lodash";
import { getFittedNormalDistributionLine } from "./get-fitted-normal-distribution-line.function";
import { resolveConnectedScatterPlotConfig } from "./resolve-connected-scatter-plot-config.function";
import { computeTotalP } from "../compute-total-p.function";
import { notNullOrUndefined } from "dgp-ng-app";

import { createNormalInterpolatorWithBoundaries } from "./create-normal-interpolator-with-boundaries.function";
import { toPercent } from "../to-percent.function";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";
import { ScaleType } from "../../models";
import * as d3 from "d3";

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

    let pMin = getProbabilityChartPMin({P: totalP});
    let pMax = getProbabilityChartPMax({P: totalP});

    if (notNullOrUndefined(yAxisMin)) {
        pMin = fromPercent(yAxisMin);
    } else {
        yAxisMin = toPercent(pMin);
    }
    if (notNullOrUndefined(yAxisMax)) {
        pMax = fromPercent(yAxisMax);
    } else {
        yAxisMax = toPercent(pMax);
    }

    const yAxisInterpolator = createNormalInterpolatorWithBoundaries({
        P: totalP,
        /**
         * pMin and pMax can be overridden which corresponds to zooming into the data
         */
        pMin,
        pMax,
    });

    let yAxisTickValues = createNormalYAxisTickValues({P: totalP});
    yAxisTickValues = yAxisTickValues.filter(tickValue => {
        if ((notNullOrUndefined(yAxisMin) && tickValue < yAxisMin) || tickValue < toPercent(pMin)) return false;
        if ((notNullOrUndefined(yAxisMax) && tickValue > yAxisMax) || tickValue > toPercent(pMax)) return false;
        return true;
    });

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
        yAxisScaleType: ScaleType.Normal,
        yAxisTickValues,
        showDotTooltips: true,
        yAxisTickFormat: (x: number) => {
            if (x >= 1 && x <= 95) return d3.format("d")(x);
            if (x > 95) return x.toPrecision(3);
            if (x < 1) return x.toPrecision(3);

            return;
        }
    };

    return _.merge(result, config, {yAxisInterpolator, yAxisMin, yAxisMax});
}
