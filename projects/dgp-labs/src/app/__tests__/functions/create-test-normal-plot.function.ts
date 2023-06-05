import { ConnectedScatterPlot, createNormalPlot } from "dgp-ng-charts";
import { createTestNormalPlotScatterGroup } from "./create-test-normal-plot-scatter-group.function";

export function createTestNormalPlot(payload: {
    readonly n: number;
}): ConnectedScatterPlot {

    const n = payload.n;

    return createNormalPlot({
        model: [
            createTestNormalPlotScatterGroup({n})
        ]
    });
}
