import { ChartMargin } from "../../shared/models";
import * as d3 from "d3";
import { KVS } from "entity-store";

export interface BarChartScales {
    readonly containerWidth: number;
    readonly containerHeight: number;
    readonly barAreaWidth: number;
    readonly barAreaHeight: number;
    readonly chartMargin: ChartMargin;
    readonly xAxis: d3.ScaleBand<string>;
    readonly xAxisSubgroupKVS: KVS<d3.ScaleBand<string>>;
    readonly yAxis: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
}
