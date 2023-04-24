import { ControlLineAxis, Stroke } from "../../stroke/models";

export interface ConnectedScatterPlotControlLine {
    readonly connectedScatterPlotControlLineId: string;
    readonly label: string;
    readonly value: number;
    readonly colorHex: string;
    readonly stroke?: Stroke;
    /**
     * Implicit default: Y
     */
    readonly axis?: ControlLineAxis;
}
