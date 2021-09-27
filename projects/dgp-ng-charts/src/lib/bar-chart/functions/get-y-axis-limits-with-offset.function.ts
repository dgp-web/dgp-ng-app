import { defaultBarChartConfig } from "../constants";
import { Limits } from "../../box-plot/models";

/**
 * Applies offset to limits
 */
export function getYAxisLimitsWithOffset(payload: {
    readonly limitsFromValues: Limits;
}, config = defaultBarChartConfig): Limits {

    const distance = Math.abs(payload.limitsFromValues.max - payload.limitsFromValues.min);

    return {
        max: payload.limitsFromValues.max + distance * config.cardinalScaleOffset,
        // min: payload.limitsFromValues.min - distance * config.cardinalScaleOffset
        min: 0
    };
}