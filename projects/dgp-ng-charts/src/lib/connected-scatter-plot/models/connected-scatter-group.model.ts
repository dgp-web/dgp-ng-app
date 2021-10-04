import { ConnectedScatterSeries } from "./connected-scatter-series.model";
import { ConnectedScatterSeriesConfig } from "./connected-scatter-series-config.model";

export interface ConnectedScatterGroup extends ConnectedScatterSeriesConfig {
    readonly connectedScatterGroupId: string;
    readonly series: ReadonlyArray<ConnectedScatterSeries>;
}
