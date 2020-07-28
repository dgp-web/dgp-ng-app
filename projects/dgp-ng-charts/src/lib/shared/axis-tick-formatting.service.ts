import * as _ from "lodash";
import * as d3 from "d3";

export interface TrimCategoricalXAxisTicksConfig {
    readonly assumedTickWidth: number;
}

export const defaultTrimCategoricalXAxisTicksConfig: TrimCategoricalXAxisTicksConfig = {
    assumedTickWidth: 64
};

/**
 * Recursively trims ticks for a categorical x axis by considering
 * the current width of a container, the remaining number of ticks,
 * and an estimated tick width
 */
function trimCategoricalXAxisTicks(payload: {
    readonly currentXAxisValues: ReadonlyArray<string>;
    readonly containerWidth: number;
}, config = defaultTrimCategoricalXAxisTicksConfig): ReadonlyArray<string> {

    const totalDisplayedTicks = payload.currentXAxisValues.length;

    if (totalDisplayedTicks < 2) {
        return payload.currentXAxisValues;
    }

    const assumedTotalTickSize = payload.currentXAxisValues.length * config.assumedTickWidth;
    const containerWidth = payload.containerWidth;

    if (assumedTotalTickSize < containerWidth) {
        return payload.currentXAxisValues;
    }

    let xAxisTicks = payload.currentXAxisValues;

    if (assumedTotalTickSize >= containerWidth) {
        xAxisTicks = payload.currentXAxisValues.filter((x, index) => {
            return index % 2 === 0;
        });
    }

    return trimCategoricalXAxisTicks({
        containerWidth: payload.containerWidth,
        currentXAxisValues: xAxisTicks
    }, config);

}

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
function estimateContinuousYAxisTickCount(
    payload: GetContinuousYAxisTickCountPayload,
    config = defaultGetContinuousYAxisTickCountConfig
): number {
    return payload.containerHeight / config.assumedTickHeight;
}

export interface ComputeMaxContinuousYAxisTickCharCountPayload {
    readonly yValuesToConsider: ReadonlyArray<number>;
}

export interface ComputeMaxContinuousYAxisTickCharCountConfig {
    /**
     * Describes how values are transformed
     */
    readonly valueFormatter: (x: number) => string;
}

export const defaultComputeMaxContinuousYAxisTickCharCountConfig: ComputeMaxContinuousYAxisTickCharCountConfig = {
    valueFormatter: d3.format("~r")
};

function computeMaxContinuousYAxisTickCharCount(
    payload: ComputeMaxContinuousYAxisTickCharCountPayload,
    config = defaultComputeMaxContinuousYAxisTickCharCountConfig
): number {
    return _.max(
        payload.yValuesToConsider.map(x => config.valueFormatter(x).length)
    );
}

export interface EstimateMaxYAxisTickWidthPayload {
    readonly maxYAxisTickChartCount: number;
}

export interface EstimateMaxYAxisTickWidthConfig {
    readonly estimatedCharWidthPx: number;
}

export const defaultEstimateMaxYAxisTickWidthConfig: EstimateMaxYAxisTickWidthConfig = {
    estimatedCharWidthPx: 10
};

export interface EstimateMaxYAxisTickWidthResult {
    readonly maxTickWidthPx: number;
}

function estimateMaxYAxisTickWidth(
    payload: EstimateMaxYAxisTickWidthPayload,
    config = defaultEstimateMaxYAxisTickWidthConfig
): EstimateMaxYAxisTickWidthResult {
    return {
        maxTickWidthPx: payload.maxYAxisTickChartCount * config.estimatedCharWidthPx
    };
}

export const axisTickFormattingService = {
    trimCategoricalXAxisTicks,
    estimateContinuousYAxisTickCount,
    estimateMaxYAxisTickWidth,
    computeMaxContinuousYAxisTickCharCount
};
