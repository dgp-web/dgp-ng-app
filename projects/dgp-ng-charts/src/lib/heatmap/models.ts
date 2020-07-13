import { SharedChartConfig } from "../shared/models";

export interface HeatmapTile {
    readonly x: number;
    readonly y: number;
    readonly value: number;
}


export interface HeatmapConfig extends SharedChartConfig {
}


export interface HeatmapSelection {
    readonly tiles?: ReadonlyArray<HeatmapTile>;
}
