import { Chart } from "../../shared/models";
import { BoxGroup } from "./box-group.model";

export interface BoxPlot extends Chart {
    readonly model: ReadonlyArray<BoxGroup>;
}
