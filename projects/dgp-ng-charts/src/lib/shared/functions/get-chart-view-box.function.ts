import { Size } from "dgp-ng-app";

export function getChartViewBox(payload: {
    readonly containerDOMRect: Size;
}): string {
    const rect = payload.containerDOMRect;

    const height = rect.height;
    const width = rect.width;

    return "0 0 " + width + " " + height;
}
