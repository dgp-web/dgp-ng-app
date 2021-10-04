import { Chart } from "../../shared/models";
import { BarGroups } from "./bar-groups.model";

export interface BarChart extends Chart {
    readonly model: BarGroups;
}
