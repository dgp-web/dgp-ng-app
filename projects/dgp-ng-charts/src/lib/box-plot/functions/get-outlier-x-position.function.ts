import { BoxOutlier, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants";
import { getJitter } from "./get-jitter.function";

export function getOutlierXPosition(
    outlier: BoxOutlier,
    scales: BoxPlotScales,
    config = defaultBoxPlotConfig
): number {
    return scales.xAxisScale(outlier.boxGroupId.toString())
        + scales.xAxisSubgroupKVS[outlier.boxGroupId].bandwidth() / 2
        + scales.xAxisSubgroupKVS[outlier.boxGroupId](outlier.boxId.toString())
        + getJitter(outlier.boxId + outlier.value, config);
}
