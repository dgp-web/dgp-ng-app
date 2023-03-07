import { notNullOrUndefined } from "dgp-ng-app";
import { connectedScatterPlotMetadata } from "../constants/connected-scatter-plot-metadata.constant";

export function resolveConnectedScatterPlotLineWidth(lineWidth?: number): number {

    if (notNullOrUndefined(lineWidth) && lineWidth >= 0) return lineWidth;

    return connectedScatterPlotMetadata.attributes.lineWidth.defaultValue;

}
