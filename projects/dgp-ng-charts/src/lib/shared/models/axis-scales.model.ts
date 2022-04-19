import { AxisScale } from "d3-axis";
import { ChartMargin } from "./chart-margin.model";
import { Axis } from "d3";
import { CardinalYAxis } from "./cardinal-y-axis.model";
import { CardinalXAxis } from "./cardinal-x-axis.model";
import { CategoricalXAxis } from "./categorical-x-axis.model";
import { DataAreaSize } from "./data-area-size.model";
import { ContainerSize } from "./container-size.model";

export interface AxisScales extends ContainerSize, DataAreaSize {
    readonly chartMargin: ChartMargin;
    readonly xAxisScale: AxisScale<any>;
    readonly xAxis: Axis<any>;
    readonly yAxisScale: AxisScale<any>;
    readonly yAxis: Axis<any>;
    readonly yAxisModel: CardinalYAxis;
    readonly xAxisModel?: CardinalXAxis | CategoricalXAxis;
}
