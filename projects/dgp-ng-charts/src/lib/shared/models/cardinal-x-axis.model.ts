import { ScaleType } from "./scale-type.model";
import { XAxisTitle } from "./x-axis-title.mode";
import { ShowXAxisGridLines } from "./show-x-axis-grid-lines.model";

export interface CardinalXAxis extends XAxisTitle, ShowXAxisGridLines {
    readonly xAxisMin?: number;
    readonly xAxisMax?: number;
    readonly xAxisStep?: number;
    readonly xAxisTickFormat?: (x: string) => string;
    readonly xAxisScaleType?: ScaleType;
}
