import { ScaleType } from "./scale-type.model";

export interface CardinalYAxis {
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
    readonly yAxisStep?: number;
    readonly yAxisScaleType?: ScaleType;
    readonly yAxisTickFormat?: (x: string) => string;
}
