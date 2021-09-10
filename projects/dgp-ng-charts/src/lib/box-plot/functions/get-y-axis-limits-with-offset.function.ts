import { Limits } from "../models";
import { defaultBoxPlotConfig } from "../constants";

/**
 * Applies offset to limits
 */
export function getYAxisLimitsWithOffset(payload: {
    readonly limitsFromValues: Limits;
}, config = defaultBoxPlotConfig): Limits {

    const distance = Math.abs(payload.limitsFromValues.max - payload.limitsFromValues.min);

    return {
        max: payload.limitsFromValues.max + distance * config.cardinalScaleOffset,
        min: payload.limitsFromValues.min - distance * config.cardinalScaleOffset
    };
}
