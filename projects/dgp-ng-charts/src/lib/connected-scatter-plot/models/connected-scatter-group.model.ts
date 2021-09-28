import { ConnectedScatterSeries } from "./connected-scatter-series.model";

export interface ConnectedScatterGroup {
    readonly series: ReadonlyArray<ConnectedScatterSeries>;
}
