import * as d3 from "d3";
import { SharedChartConfig } from "../shared/models";

export interface Box {
    readonly boxId: string;
    /**
     * Boxes may be included in a group
     */
    readonly boxGroupId?: string;
    /**
     * Boxes may come along with a BoxValues
     * that contains their original data
     */
    readonly boxValuesId?: string;

    readonly quantiles: BoxQuantiles;

    readonly outliers?: ReadonlyArray<number>;

    readonly colorHex: string;
}

export interface BoxBody {
    /**
     * Boxes may come along with a BoxValues
     * that contains their original data
     */
    readonly boxValuesId?: string;

    readonly quantiles: BoxQuantiles;
}

export interface BoxQuantiles {
    readonly max: number;
    readonly upper: number;
    readonly median: number;
    readonly lower: number;
    readonly min: number;
}


export interface BoxGroup<TValue = string | number> {
    readonly boxGroupId?: string;
    readonly label: string;
    readonly value?: TValue;
    readonly boxes: ReadonlyArray<Box>;
    readonly boxValues?: ReadonlyArray<BoxValues>;
}

export interface BoxPlotConfig extends SharedChartConfig {
    readonly groupPadding: number;
    readonly subGroupPadding: number;
    /**
     * Normalized share with which the extreme values
     * are offset from the borders of the drawing area.
     *
     * If this is 0, then the extreme values are
     * drawn directly onto the borders
     *
     * default: 0.05
     */
    readonly cardinalScaleOffset: number;
    readonly jitterWidth: number;
}

export interface BoxPlotScales {
    readonly xAxis: d3.ScaleBand<string>;
    readonly xAxisSubgroup: d3.ScaleBand<string>;
    readonly yAxis: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
}

export interface BoxValues {
    readonly boxValuesId: string;

    readonly originalValues: ReadonlyArray<number>;
}


export type BrushCoordinates = [[number, number], [number, number]];

export interface Limits<T = number> {
    readonly min: T;
    readonly max: T;
}

export interface BoxOutlierId {
    readonly boxId: string;
    readonly boxGroupId: string;
    readonly outlierIndex: number;
}

export interface BoxOutlier extends BoxOutlierId {
    readonly value: any;
    readonly colorHex: string;
}

export interface BoxPlotSelection {
    readonly outliers?: ReadonlyArray<BoxOutlier>;
}
