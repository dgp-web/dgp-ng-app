import { ChartMargin } from "../models";

export function getPlotRootTransform(payload: ChartMargin) {
    return "translate(" + payload.left + " " + payload.top + ")";
}
