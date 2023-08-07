import { ScaleType } from "./scale-type.model";
import { XAxisTitle } from "./x-axis-title.mode";
import { ShowXAxisGridLines } from "./show-x-axis-grid-lines.model";

export interface CategoricalXAxis extends XAxisTitle, ShowXAxisGridLines {
    readonly xAxisScaleType?: ScaleType.Categorical;
    readonly xAxisTickFormat?: (x: string) => string;
}
