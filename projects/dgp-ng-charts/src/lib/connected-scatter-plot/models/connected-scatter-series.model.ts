import { Dot } from "./dot.model";
import { ConnectedScatterSeriesConfig } from "./connected-scatter-series-config.model";

export interface ConnectedScatterSeries extends ConnectedScatterSeriesConfig {
    readonly connectedScatterSeriesId: string;
    readonly label?: string;
    readonly dots: ReadonlyArray<Dot>;
}
