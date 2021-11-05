import { Stroke } from "../../stroke/models";

export interface BoxPlotControlLine {
    readonly boxPlotControlLineId: string;
    readonly label: string;
    readonly value: number;
    readonly colorHex: string;
    readonly stroke?: Stroke;
}
