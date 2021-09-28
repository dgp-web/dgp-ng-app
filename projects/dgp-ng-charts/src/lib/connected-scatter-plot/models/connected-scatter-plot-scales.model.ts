import { ChartMargin } from "../../shared/models";
import { ScaleLinear, ScaleLogarithmic } from "d3";

export interface ConnectedScatterPlotScales {
    readonly containerWidth: number;
    readonly containerHeight: number;
    /**
     * Size of the area where visual components are drawn
     *
     * This is the size of the container without margins for axes
     */
    readonly dataAreaWidth: number;
    readonly dataAreaHeight: number;
    readonly chartMargin: ChartMargin;
    readonly xAxis: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
    readonly yAxis: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
}
