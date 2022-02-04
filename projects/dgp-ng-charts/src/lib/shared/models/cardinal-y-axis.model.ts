import { ScaleType } from "./scale-type.model";
import { CardinalAxisTickFormat } from "./cardinal-axis-tick-format.model";

export interface CardinalYAxis {
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
    readonly yAxisStep?: number;
    readonly yAxisScaleType?: ScaleType;
    readonly yAxisTickFormat?: CardinalAxisTickFormat;
}
