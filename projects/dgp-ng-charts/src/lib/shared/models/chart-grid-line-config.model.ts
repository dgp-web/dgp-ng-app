import { ShowXAxisGridLines } from "./show-x-axis-grid-lines.model";
import { ShowYAxisGridLines } from "./show-y-axis-grid-lines.model";

export interface ChartGridLineConfig extends ShowXAxisGridLines, ShowYAxisGridLines {
    readonly showDataAreaOutline?: boolean;
}
