import { Many } from "data-modeling";
import { toWeibullInput } from "./to-weibull-input.function";
import { toMedianRank } from "../to-median-rank.function";
import { toProbabilityChartDots } from "../to-probability-chart-dots.function";
import { createGuid } from "dgp-ng-app";
import { getFittedWeibullDistributionLine } from "./get-fitted-weibull-distribution-line.function";
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
        showEdges: true,
        showVertices: true,
        series: [{
            connectedScatterSeriesId: connectedScatterGroupId + ".Data",
            colorHex: "#00ff0066",
            showVertices: true,
            showEdges: false,
            dots
        }, {
            connectedScatterSeriesId: connectedScatterGroupId + ".Fitted distribution",
            colorHex: "#ff0000",
            showVertices: false,
            showEdges: true,
            dots: getFittedWeibullDistributionLine({X, P})
        }]
    };

    return _.merge(config, result);

}
