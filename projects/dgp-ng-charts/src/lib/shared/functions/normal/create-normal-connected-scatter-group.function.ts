import { Many } from "data-modeling";
import { ConnectedScatterGroup } from "../../../connected-scatter-plot/models";
import { toMedianRank } from "../to-median-rank.function";
import { toProbabilityChartDots } from "../to-probability-chart-dots.function";
import { createGuid } from "dgp-ng-app";
import * as _ from "lodash";
import { NormalPlotOptimizationState } from "../../../normal/optimization/models";
import { tryGetCachedNormalP } from "../../../normal/optimization/functions";

export function createNormalConnectedScatterGroup(payload: {
    readonly values: Many<number>;
    readonly labels?: Many<string>;
} & Partial<NormalPlotOptimizationState>, config: Partial<ConnectedScatterGroup> = {}): ConnectedScatterGroup {
    const values = payload.values;
    let labels = payload.labels;
    const Ps = payload.Ps;

    let X: Many<number>;

    if (labels) {
        let valueLabelCombis = values.map((x, i) => {
            return {value: x, label: labels[i]};
        });
        valueLabelCombis = _.sortBy(valueLabelCombis, x => x.value);
        X = valueLabelCombis.map(x => x.value);
        labels = valueLabelCombis.map(x => x.label);
    } else {
        X = _.sortBy(values);
    }

    const collectionLength = X.length;

    let P = tryGetCachedNormalP({collectionLength, Ps});
    if (!P) P = X.map(toMedianRank);

    const dots = toProbabilityChartDots({X, P, labels});

    const connectedScatterGroupId = createGuid();

    const result: ConnectedScatterGroup = {
        connectedScatterGroupId,
        series: [{
            connectedScatterSeriesId: connectedScatterGroupId + ".Data",
            colorHex: config.colorHex || "#00ff0066",
            showVertices: config.showVertices || true,
            showEdges: config.showEdges || false,
            dots
        }]
    };

    return _.merge(config, result);

}
