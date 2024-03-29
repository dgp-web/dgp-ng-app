import { Many } from "data-modeling";
import { toWeibullInput } from "./to-weibull-input.function";
import { toMedianRank } from "../to-median-rank.function";
import { toProbabilityChartDots } from "../to-probability-chart-dots.function";
import { createGuid } from "dgp-ng-app";
import * as _ from "lodash";
import { ConnectedScatterGroup } from "../../../connected-scatter-plot/models";

export function createWeibullConnectedScatterGroup(payload: {
    readonly values: Many<number>;
}, config: Partial<ConnectedScatterGroup> = {}): ConnectedScatterGroup {
    const values = payload.values;

    const X = toWeibullInput(values);
    const P = X.map(toMedianRank);
    const dots = toProbabilityChartDots({X, P});

    const connectedScatterGroupId = createGuid();

    const result: ConnectedScatterGroup = {
        connectedScatterGroupId,
        colorHex: config.colorHex || "#00ff0066",
        showEdges: config.showEdges || false,
        shape: config.shape,
        stroke: config.stroke,
        series: [{
            connectedScatterSeriesId: connectedScatterGroupId + ".Data",
            showVertices: true,
            dots
        }]
    };

    return _.merge(config, result);

}
