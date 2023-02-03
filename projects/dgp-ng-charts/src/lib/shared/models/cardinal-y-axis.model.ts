import { ScaleType } from "./scale-type.model";
import { CardinalAxisTickFormat } from "./cardinal-axis-tick-format.model";
import { YAxisTitle } from "./y-axis-title.model";
import { ShowYAxisGridLines } from "./show-y-axis-grid-lines.model";

export interface CardinalYAxis extends YAxisTitle, ShowYAxisGridLines {
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
    readonly yAxisStep?: number;
    readonly yAxisScaleType?: ScaleType;
    readonly yAxisTickFormat?: CardinalAxisTickFormat;
}
