import { Shape } from "../../symbols/models";

export interface ConnectedScatterSeriesConfig {
    readonly colorHex?: string;
    /**
     * default value: "Circle"
     */
    readonly shape?: Shape;
}
