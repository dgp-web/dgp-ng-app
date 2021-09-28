import { Chart } from "../../shared/models";
import { ConnectedScatterGroup } from "./connected-scatter-group.model";

export interface ConnectedScatterPlot extends Chart {
    readonly model: ReadonlyArray<ConnectedScatterGroup>;

    readonly xAxisMin?: number;
    readonly xAxisMax?: number;
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
}
