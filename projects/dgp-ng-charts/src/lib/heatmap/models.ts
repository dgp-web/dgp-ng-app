import { ChartMargin } from "../shared/models";

export interface HeatmapTile {
    readonly x: number;
    readonly y: number;
    readonly value: number;
}


export interface HeatmapConfig {
    readonly margin: ChartMargin;
}
