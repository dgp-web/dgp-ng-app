import { AxisScales } from "../../shared/models";
import { ScaleLinear, ScaleLogarithmic } from "d3";

export interface ConnectedScatterPlotScales extends AxisScales {
    readonly xAxis: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
    readonly yAxis: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
}
