import { Many } from "data-modeling";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotConfig } from "../../../connected-scatter-plot/models";
import { fromPercent } from "../from-percent.function";
import { createNormalYAxisTickValues } from "./create-normal-y-axis-tick-values.function";
import * as _ from "lodash";
import { getFittedNormalDistributionLine } from "./get-fitted-normal-distribution-line.function";
import { resolveConnectedScatterPlotConfig } from "./resolve-connected-scatter-plot-config.function";
import { computeTotalP } from "../compute-total-p.function";
import { notNullOrUndefined } from "dgp-ng-app";

import { createNormalInterpolatorWithBoundariesFactory } from "./create-normal-interpolator-with-boundaries-factory.function";
import { getNormalPMin } from "./get-normal-p-min.function";
import { getNormalPMax } from "./get-normal-p-max.function";
import { ScaleType } from "../../models";
import { probabilityPlotTickFormat } from "../../constants";
import { normalPlotTooltipFormat } from "./normal-plot-tooltip-format.constant";

export function createNormalPlot(
    payload: {
        readonly model: Many<ConnectedScatterGroup>
    },
    config: ConnectedScatterPlotConfig = {}
): ConnectedScatterPlot {

    config = resolveConnectedScatterPlotConfig(config);

    let model = payload.model;

    const yAxisMin = config.yAxisMin;
    const yAxisMax = config.yAxisMax;

    const totalP = computeTotalP(model);

    let pMin = getNormalPMin({P: totalP});
    let pMax = getNormalPMax({P: totalP});

    if (notNullOrUndefined(yAxisMin)) {
        pMin = fromPercent(yAxisMin);
    }
    if (notNullOrUndefined(yAxisMax)) {
        pMax = fromPercent(yAxisMax);
    }

    const yAxisTickValues = createNormalYAxisTickValues({P: totalP, yAxisMin, yAxisMax});

    const yAxisInterpolator = createNormalInterpolatorWithBoundariesFactory({
        P: totalP,
        /**
         * pMin and pMax can be overridden which corresponds to zooming into the data
         */
        pMin,
        pMax
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
                    dots: getFittedNormalDistributionLine({X, totalPMin: pMin, totalPMax: pMax})
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
        yAxisTickFormat: probabilityPlotTickFormat,
        dotTooltipFormat: normalPlotTooltipFormat
    };

    return _.merge(result, config, {yAxisInterpolator, yAxisMin, yAxisMax});
}

