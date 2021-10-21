import { Shape } from "../../shapes/models";

export interface ConnectedScatterSeriesConfig {
    readonly colorHex?: string;
    /**
     * default value: "Circle"
     */
    readonly shape?: Shape;

    /**
     * Whether the lines between the vertices should be displayed
     *
     * default value: undefined == true
     */
    readonly showEdges?: boolean;

    /**
     * Whether the dots on the end of lines should be displayed
     *
     * default value: undefined == false
     */
    readonly showVertices?: boolean;
}
