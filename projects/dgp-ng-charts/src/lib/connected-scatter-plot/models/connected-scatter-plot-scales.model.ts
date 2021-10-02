import { AxisScales } from "../../shared/models";
import { ScaleLinear, ScaleLogarithmic } from "d3";

export interface ConnectedScatterPlotScales extends AxisScales {
    readonly xAxisScale: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
    readonly yAxisScale: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
}
