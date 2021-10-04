import { ScaleType } from "./scale-type.model";

export interface CardinalYAxis {
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
    readonly yAxisScaleType?: ScaleType;
}
