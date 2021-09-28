import { Dot } from "./dot.model";
import { Shape } from "../../symbols/models";

export interface ConnectedScatterSeries {
    readonly connectedScatterSeriesId: string;
    readonly dots: ReadonlyArray<Dot>;
    readonly colorHex: string;
    /**
     * default value: "Circle"
     */
    readonly shape?: Shape;
}
