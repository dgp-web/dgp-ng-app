import { Many } from "data-modeling";
import { ConnectedScatterGroup, ConnectedScatterPlot } from "../../../connected-scatter-plot/models";
import { byUnique, matrixToMany } from "dgp-ng-app";
import { fromPercent } from "../from-percent.function";
import { createNormalYAxisTickValues } from "./create-normal-y-axis-tick-values.function";
import * as d3 from "d3";
import * as _ from "lodash";
import { createNormalInterpolator } from "./create-normal-interpolator.function";

export function createNormalPlot(
    payload: {
        readonly model: Many<ConnectedScatterGroup>
    },
    config: Partial<ConnectedScatterPlot> = {}
): ConnectedScatterPlot {

    const model = payload.model;

    const P = model.map(x => x.series)
        .reduce(matrixToMany, [])
        .map(x => x.dots)
        .reduce(matrixToMany, [])
        .map(x => x.y)
        .map(fromPercent)
        .filter(byUnique)
        .sort();

    const yAxisInterpolator = createNormalInterpolator({P});

    const yAxisTickValues = createNormalYAxisTickValues({P});

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
