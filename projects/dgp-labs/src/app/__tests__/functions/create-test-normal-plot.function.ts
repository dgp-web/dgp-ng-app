import { ConnectedScatterPlot, createNormalConnectedScatterGroup, createNormalPlot } from "dgp-ng-charts";
import * as d3 from "d3";

export function createTestNormalPlot(payload: {
    readonly n: number;
}): ConnectedScatterPlot {

    const n = payload.n;
    /*    const scale = payload.scale;
        const shape = payload.shape;*/

    const rdm = d3.randomNormal(0, 1);
    const values = Array.from({length: n}, () => rdm());

    return createNormalPlot({
        model: [
            createNormalConnectedScatterGroup({values})
        ]
    });
}
