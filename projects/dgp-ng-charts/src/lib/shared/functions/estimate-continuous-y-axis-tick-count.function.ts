export interface GetContinuousYAxisTickCountPayload {
    readonly containerHeight: number;
}

export interface GetContinuousYAxisTickCountConfig {
    readonly assumedTickHeight: number;
}

export const defaultGetContinuousYAxisTickCountConfig: GetContinuousYAxisTickCountConfig = {
    assumedTickHeight: 48
};

/**
 * Estimates the number of ticks on a continuous y axis
 * by considering the chart height and an assumed tick height
 */
export function estimateContinuousYAxisTickCount(
    payload: GetContinuousYAxisTickCountPayload,
    config = defaultGetContinuousYAxisTickCountConfig
): number {
    return payload.containerHeight / config.assumedTickHeight;
}
