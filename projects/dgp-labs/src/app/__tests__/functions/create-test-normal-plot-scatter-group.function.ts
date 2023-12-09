import * as d3 from "d3";
import { createNormalConnectedScatterGroup } from "dgp-ng-charts";
import * as _ from "lodash";

export function createTestNormalPlotScatterGroup(payload: {
    readonly n: number;
}) {

    const n = payload.n;

    const rdm = d3.randomNormal(0, 1);
    let values = Array.from({length: n}, () => rdm());
    values = _.sortBy(values);
    const labels = values.map((x, i) => {
        return "Dot " + (i + 1);
    });

    return createNormalConnectedScatterGroup({values, labels}, {
        label: "Test data group"
    });
}
