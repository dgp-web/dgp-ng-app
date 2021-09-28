import { AxisScale } from "d3-axis";
import { ChartMargin } from "./chart-margin.model";

export interface AxisScales {
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
    readonly xAxis: AxisScale<any>;
    readonly yAxis: AxisScale<any>;
}
