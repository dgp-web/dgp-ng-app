import { AxisScales } from "./axis-scales.model";
import * as d3 from "d3";
import { KVS } from "entity-store";
import { CardinalYAxis } from "./cardinal-y-axis.model";
import { CategoricalXAxis } from "./categorical-x-axis.model";

export interface CategorizedValuesChartScales extends AxisScales {
    readonly xAxisScale: d3.ScaleBand<string>;
    readonly xAxisSubgroupKVS: KVS<d3.ScaleBand<string>>;
    readonly yAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly yAxisModel: CardinalYAxis;
    readonly xAxisModel?: CategoricalXAxis;
}
