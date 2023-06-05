import * as d3 from "d3";
import { createNormalConnectedScatterGroup } from "dgp-ng-charts";

export function createTestNormalPlotScatterGroup(payload: {
    readonly n: number;
}) {

    const n = payload.n;

    const rdm = d3.randomNormal(0, 1);
    const values = Array.from({length: n}, () => rdm());

    return createNormalConnectedScatterGroup({values});
}
