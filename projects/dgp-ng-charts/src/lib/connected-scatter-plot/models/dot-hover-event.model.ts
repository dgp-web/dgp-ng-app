import { Dot } from "./dot.model";
import { ConnectedScatterSeries } from "./connected-scatter-series.model";
import { ConnectedScatterGroup } from "./connected-scatter-group.model";

export interface DotHoverEvent {
    readonly dot: Dot;
    readonly series: ConnectedScatterSeries;
    readonly group: ConnectedScatterGroup;
    readonly absoluteDomXPx: number;
    readonly absoluteDomYPx: number;
}
