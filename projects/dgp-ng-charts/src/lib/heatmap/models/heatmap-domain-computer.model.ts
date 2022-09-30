import { DomainComputer } from "./domain-computer.model";
import { HeatmapTile } from "./heatmap-tile.model";

export type HeatmapDomainComputer = DomainComputer<ReadonlyArray<HeatmapTile>>;
