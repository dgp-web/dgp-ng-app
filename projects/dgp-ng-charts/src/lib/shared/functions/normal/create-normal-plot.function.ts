import { Many } from "data-modeling";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotConfig } from "../../../connected-scatter-plot/models";
import { fromPercent } from "../from-percent.function";
import { createNormalYAxisTickValues } from "./create-normal-y-axis-tick-values.function";
import * as d3 from "d3";
import * as _ from "lodash";
import { createNormalInterpolator } from "./create-normal-interpolator.function";
import { getFittedNormalDistributionLine } from "./get-fitted-normal-distribution-line.function";
import { resolveConnectedScatterPlotConfig } from "./resolve-connected-scatter-plot-config.function";
import { computeTotalP } from "../compute-total-p.function";

export function createNormalPlot(
    payload: {
        readonly model: Many<ConnectedScatterGroup>
    },
    config: ConnectedScatterPlotConfig = {}
): ConnectedScatterPlot {

    config = resolveConnectedScatterPlotConfig(config);

    let model = payload.model;

    const totalP = computeTotalP(model);

    const yAxisInterpolator = createNormalInterpolator({P: totalP});

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
        yAxisMin: 0,
        yAxisMax: 100,
        model,
        showXAxisGridLines: true,
        showYAxisGridLines: true,
        dotSize: 8,
        yAxisTickValues,
        yAxisTickFormat: (x: number) => {
            if (x >= 1 && x <= 95) return d3.format("d")(x);
            if (x > 95) return x.toPrecision(3);
            if (x < 1) return x.toPrecision(3);

            return;
        }
    };

    return _.merge(result, config);
}
