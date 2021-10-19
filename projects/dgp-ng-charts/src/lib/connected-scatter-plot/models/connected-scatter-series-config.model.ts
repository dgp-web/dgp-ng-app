import { Shape } from "../../symbols/models";

export interface ConnectedScatterSeriesConfig {
    readonly colorHex?: string;
    /**
     * default value: "Circle"
     */
    readonly shape?: Shape;

    /**
     * Whether the lines between the vertices should be displayed
     *
     * default value: undefined == false
     */
    readonly hideEdges?: boolean;

    /**
     * Whether the dots on the end of lines should be displayed
     *
     * default value: undefined == false
     */
    readonly hideVertices?: boolean;
}
