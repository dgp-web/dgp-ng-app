import { Many } from "data-modeling";
import { matrixToMany } from "dgp-ng-app";
import { createWeibullYAxisTickValues } from "./create-weibull-y-axis-tick-values.function";
import * as d3 from "d3";
import * as _ from "lodash";
import { ConnectedScatterGroup, ConnectedScatterPlot } from "../../../connected-scatter-plot/models";
import { createWeibullInterpolator } from "./create-weibull-interpolator.function";
import { fromPercent } from "../from-percent.function";

export function createWeibullPlot(
    payload: {
        readonly model: Many<ConnectedScatterGroup>;
    },
    config: Partial<ConnectedScatterPlot> = {}
): ConnectedScatterPlot {

    const model = payload.model;

    const P = model.map(x => x.series)
        .reduce(matrixToMany, [])
        .map(x => x.dots)
        .reduce(matrixToMany, [])
        .map(x => x.y)
        .map(fromPercent);

    const yAxisInterpolator = createWeibullInterpolator({P});

    const yAxisTickValues = createWeibullYAxisTickValues({P});

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
            if (x >= 1 && x <= 99) return d3.format("d")(x);
            if (x > 99) return x.toPrecision(3);
            if (x < 1) return x.toPrecision(3);

            return;
        }
    };

    return _.merge(config, result);

}
