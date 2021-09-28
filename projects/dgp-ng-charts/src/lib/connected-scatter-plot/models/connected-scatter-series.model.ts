import { Dot } from "./dot.model";

export interface ConnectedScatterSeries {
    readonly connectedScatterSeriesId: string;
    readonly dots: ReadonlyArray<Dot>;
}
