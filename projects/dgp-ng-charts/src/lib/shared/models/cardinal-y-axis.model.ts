import { ScaleType } from "./scale-type.model";

export interface CardinalYAxis {
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
    readonly yAxisTicks?: number;
    readonly yAxisScaleType?: ScaleType;
}
