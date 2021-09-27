import { SharedChartConfig } from "../../shared/models";

export interface BarChartConfig extends SharedChartConfig {
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
}
