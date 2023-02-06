import { XAxisTitle } from "./x-axis-title.mode";
import { YAxisTitle } from "./y-axis-title.model";

export interface ChartTitles extends XAxisTitle, YAxisTitle {
    readonly chartTitle?: string;
}
