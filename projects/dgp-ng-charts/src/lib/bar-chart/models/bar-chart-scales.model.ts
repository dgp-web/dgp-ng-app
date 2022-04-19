import { AxisScales, CardinalYAxis, CategoricalXAxis } from "../../shared/models";
import * as d3 from "d3";
import { KVS } from "entity-store";

export interface BarChartScales extends AxisScales {
    readonly xAxisScale: d3.ScaleBand<string>;
    readonly xAxisSubgroupKVS: KVS<d3.ScaleBand<string>>;
    readonly yAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly yAxisModel: CardinalYAxis;
    readonly xAxisModel?: CategoricalXAxis;
}
