import { ChartMargin } from "../../shared/models";
import { ScaleLinear, ScaleLogarithmic } from "d3";

export interface ConnectedScatterPlotScales {
    readonly containerWidth: number;
    readonly containerHeight: number;
    readonly barAreaWidth: number;
    readonly barAreaHeight: number;
    readonly chartMargin: ChartMargin;
    readonly xAxis: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
    readonly yAxis: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
}
