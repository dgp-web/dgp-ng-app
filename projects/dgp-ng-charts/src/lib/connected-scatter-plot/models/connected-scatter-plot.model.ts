import { Chart } from "../../shared/models";
import { ConnectedScatterGroup } from "./connected-scatter-group.model";

export interface ConnectedScatterPlot extends Chart {
    readonly model: ReadonlyArray<ConnectedScatterGroup>;
}
