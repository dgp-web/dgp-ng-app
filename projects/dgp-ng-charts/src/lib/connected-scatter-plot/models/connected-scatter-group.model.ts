import { ConnectedScatterSeries } from "./connected-scatter-series.model";

export interface ConnectedScatterGroup {
    readonly connectedScatterGroupId: string;
    readonly series: ReadonlyArray<ConnectedScatterSeries>;
}
