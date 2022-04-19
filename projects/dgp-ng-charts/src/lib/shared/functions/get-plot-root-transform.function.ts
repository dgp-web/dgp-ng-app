import { ChartMargin } from "dgp-ng-charts";

export function getPlotRootTransform(payload: ChartMargin) {
    return "translate(" + payload.left + " " + payload.top + ")";
}
