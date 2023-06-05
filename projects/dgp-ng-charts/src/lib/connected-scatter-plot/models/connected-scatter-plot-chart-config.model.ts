import { SharedChartConfig } from "../../shared/models";

export interface ConnectedScatterPlotChartConfig extends SharedChartConfig {
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
    /**
     * Reference length of a character
     *
     * default: 10
     */
    readonly refTickCharWidth: number;
}
