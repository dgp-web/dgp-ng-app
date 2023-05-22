import { Many } from "data-modeling";
import { ConnectedScatterGroup } from "../../../connected-scatter-plot/models";
import { toMedianRank } from "../to-median-rank.function";
import { toProbabilityChartDots } from "../to-probability-chart-dots.function";
import { createGuid } from "dgp-ng-app";
import * as _ from "lodash";
import { getFittedNormalDistributionLine } from "./get-fitted-normal-distribution-line.function";

export function createNormalConnectedScatterGroup(payload: {
    readonly values: Many<number>;
}, config: Partial<ConnectedScatterGroup> = {}): ConnectedScatterGroup {
    const values = payload.values;

    const X = _.sortBy(values);
    const P = X.map(toMedianRank);
    const dots = toProbabilityChartDots({X, P});

    const connectedScatterGroupId = createGuid();

    const result: ConnectedScatterGroup = {
        connectedScatterGroupId,
        series: [{
            connectedScatterSeriesId: connectedScatterGroupId + ".Data",
            colorHex: config.colorHex || "#00ff0066",
            showVertices: config.showVertices || true,
            showEdges: config.showEdges || false,
            dots
        }, {
            connectedScatterSeriesId: connectedScatterGroupId + ".Fitted distribution",
            colorHex: "#ff0000",
            showVertices: false,
            showEdges: true,
            dots: getFittedNormalDistributionLine({X, P})
        }]
    };

    return _.merge(config, result);

}
