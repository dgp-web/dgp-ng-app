import { Many } from "data-modeling";
import { ConnectedScatterGroup } from "../../../connected-scatter-plot/models";
import { toMedianRank } from "../to-median-rank.function";
import { toProbabilityChartDots } from "../to-probability-chart-dots.function";
import { createGuid } from "dgp-ng-app";
import * as _ from "lodash";

export function createNormalConnectedScatterGroup(payload: {
    readonly values: Many<number>;
    readonly labels?: Many<string>;
}, config: Partial<ConnectedScatterGroup> = {}): ConnectedScatterGroup {
    const values = payload.values;
    const labels = payload.labels;

    const X = _.sortBy(values);
    const P = X.map(toMedianRank);
    const dots = toProbabilityChartDots({X, P, labels});

    const connectedScatterGroupId = createGuid();

    const result: ConnectedScatterGroup = {
        connectedScatterGroupId,
        label: config.label,
        series: [{
            connectedScatterSeriesId: connectedScatterGroupId + ".Data",
            label: "Values",
            colorHex: config.colorHex || "#00ff0066",
            showVertices: config.showVertices || true,
            showEdges: config.showEdges || false,
            dots
        }]
    };

    return _.merge(config, result);

}
