import { AxisScale } from "d3-axis";
import { ChartMargin } from "./chart-margin.model";
import { Axis } from "d3";
import { CardinalYAxis } from "./cardinal-y-axis.model";
import { CardinalXAxis } from "./cardinal-x-axis.model";
import { CategoricalXAxis } from "./categorical-x-axis.model";

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
    readonly xAxisScale: AxisScale<any>;
    readonly xAxis: Axis<any>;
    readonly yAxisScale: AxisScale<any>;
    readonly yAxis: Axis<any>;
    readonly yAxisModel: CardinalYAxis;
    readonly xAxisModel?: CardinalXAxis | CategoricalXAxis;
}
