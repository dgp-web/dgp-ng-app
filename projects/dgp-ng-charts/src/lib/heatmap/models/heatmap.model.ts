import { HeatmapTile } from "./heatmap-tile.model";

export interface HeatmapModel {
    readonly tiles: ReadonlyArray<HeatmapTile>;
}
