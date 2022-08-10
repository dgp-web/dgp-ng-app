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

function trimContinuousXAxisTicks(payload: {
    readonly currentXAxisValues: ReadonlyArray<number>;
    readonly xAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly containerWidth: number;
}, config = defaultTrimCategoricalXAxisTicksConfig): ReadonlyArray<number> {

    /**
     * Compute regular result as with other method
     */
    const result = trimCategoricalXAxisTicks({
        currentXAxisValues: payload.currentXAxisValues.map(x => x.toString()),
        containerWidth: payload.containerWidth
    }, config).map(x => +x);

    /**
     * Check for overlappings and remove them
     */

    return result;
}

export interface GetContinuousXAxisTickCountPayload {
    readonly containerWidth: number;
}

export interface GetContinuousXAxisTickCountConfig {
    readonly assumedTickWidth: number;
}

export const defaultGetContinuousXAxisTickCountConfig: GetContinuousXAxisTickCountConfig = {
    assumedTickWidth: 80
};

/**
 * Estimates the number of ticks on a continuous y axis
 * by considering the chart height and an assumed tick height
 */
function estimateContinuousXAxisTickCount(
    payload: GetContinuousXAxisTickCountPayload,
    config = defaultGetContinuousXAxisTickCountConfig
): number {
    return payload.containerWidth / config.assumedTickWidth;
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
    estimatedCharWidthPx: 8
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

function getYAxisTickDomainValues(getYAxisTickPayload: {
    readonly yAxisTickCount: number;
    readonly yAxisDomain: [number, number];
    readonly isLogarithmic?: boolean;
}): ReadonlyArray<number> {

    const values: Array<number> = [];

    const domainStart = getYAxisTickPayload.yAxisDomain[0];
    const domainEnd = getYAxisTickPayload.yAxisDomain[1];
    const totalDistance = domainEnd - domainStart;

    const tickCount = Math.ceil(getYAxisTickPayload.yAxisTickCount);

    for (let i = 0; i < tickCount; i++) {

        let distance: number;

        if (!getYAxisTickPayload.isLogarithmic) {
            distance = domainStart + totalDistance * (i / tickCount);
        } else {
            distance = i === 0 ? domainStart : Math.pow(10,
                Math.log10(domainStart) + (Math.log10(domainEnd) - Math.log10(domainStart)) * (i / tickCount)
            );

        }

        values.push(distance);

    }

    if (!values.includes(domainEnd)) values.push(domainEnd);

    return values;

}

function getXAxisTickDomainValues(getYAxisTickPayload: {
    readonly xAxisTickCount: number;
    readonly xAxisDomain: [number, number];
    readonly isLogarithmic?: boolean;
}): ReadonlyArray<number> {

    const values: Array<number> = [];

    const domainStart = getYAxisTickPayload.xAxisDomain[0];
    const domainEnd = getYAxisTickPayload.xAxisDomain[1];
    const totalDistance = domainEnd - domainStart;

    const tickCount = Math.ceil(getYAxisTickPayload.xAxisTickCount);

    for (let i = 0; i < tickCount; i++) {

        let distance: number;

        if (!getYAxisTickPayload.isLogarithmic) {
            distance = domainStart + totalDistance * (i / tickCount);
        } else {
            distance = i === 0 ? domainStart : Math.pow(10,
                Math.log10(domainStart) + (Math.log10(domainEnd) - Math.log10(domainStart)) * (i / tickCount)
            );

        }

        values.push(distance);

    }

    if (!values.includes(domainEnd)) values.push(domainEnd);

    return values;

}

function formatValueTick(value: number): string {
    return value.toPrecision(3);
    // return d3.format("~r")(value);
}

export const axisTickFormattingService = {
    trimCategoricalXAxisTicks,
    trimContinuousXAxisTicks,
    estimateContinuousXAxisTickCount,
    estimateContinuousYAxisTickCount,
    estimateMaxYAxisTickWidth,
    computeMaxContinuousYAxisTickCharCount,
    getYAxisTickDomainValues,
    getXAxisTickDomainValues,
    formatValueTick
};
