import { byUnique, matrixToMany } from "dgp-ng-app";
import { createWeibullYAxisTickValues } from "./create-weibull-y-axis-tick-values.function";
import * as d3 from "d3";
import * as _ from "lodash";
import { ConnectedScatterGroup, ConnectedScatterPlot } from "../../../connected-scatter-plot/models";
import { createWeibullInterpolator } from "./create-weibull-interpolator.function";
import { fromPercent } from "../from-percent.function";
import { Many } from "data-modeling";
import { getFittedWeibullDistributionLine } from "./get-fitted-weibull-distribution-line.function";
import { ScaleType } from "../../models";

export function createWeibullPlot(
    payload: {
        readonly model: Many<ConnectedScatterGroup>
    },
    config: Partial<ConnectedScatterPlot> = {}
): ConnectedScatterPlot {

    let model = payload.model;

    const totalP = model.map(x => x.series)
        .reduce(matrixToMany, [])
        .map(x => x.dots)
        .reduce(matrixToMany, [])
        .map(x => x.y)
        .map(fromPercent)
        .filter(byUnique)
        .sort();

    const yAxisInterpolator = createWeibullInterpolator({P: totalP});

    const yAxisTickValues = createWeibullYAxisTickValues({P: totalP});

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
                    dots: getFittedWeibullDistributionLine({X, P, totalP})
                }
            ]
        };
    });

    const result: ConnectedScatterPlot = {
        xAxisScaleType: ScaleType.Logarithmic,
        yAxisInterpolator,
        yAxisMin: 0,
        yAxisMax: 100,
        model,
        showXAxisGridLines: true,
        showYAxisGridLines: true,
        dotSize: 8,
        yAxisTickValues,
        yAxisTickFormat: (x: number) => {
            if (x >= 1 && x <= 99) return d3.format("d")(x);
            if (x > 99) return x.toPrecision(3);
            if (x < 1) return x.toPrecision(3);

            return;
        }
    };

    return _.merge(result, config);

}
