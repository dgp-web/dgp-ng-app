import { ScaleType } from "./scale-type.model";

export interface CardinalXAxis {
    readonly xAxisMin?: number;
    readonly xAxisMax?: number;
    readonly xAxisStep?: number;
    readonly xAxisTickFormat?: (x: string) => string;
    readonly xAxisScaleType?: ScaleType;
}
