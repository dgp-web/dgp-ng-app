import { CardinalYAxis, Chart } from "../../shared/models";
import { BarGroups } from "./bar-groups.model";

export interface BarChart extends Chart, CardinalYAxis {
    readonly model: BarGroups;
    readonly xAxisTickFormat?: (x: string) => string;
    readonly showYAxisGridLines?: boolean;
    readonly showXAxisGridLines?: boolean;
}
