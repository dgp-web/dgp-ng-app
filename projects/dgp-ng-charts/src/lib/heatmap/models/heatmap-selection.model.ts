import { HeatmapTile } from "./heatmap-tile.model";

export interface HeatmapSelection {
    readonly tiles?: ReadonlyArray<HeatmapTile>;
}
