import { SharedChartConfig } from "../../shared/models";
import { HeatmapDomainComputer } from "./heatmap-domain-computer.model";
import { HeatmapDomainOverrides } from "./heatmap-domain-overrides.model";
import { HeatmapTileExtent } from "./heatmap-tile-extent.model";

export interface HeatmapConfig extends SharedChartConfig {
    readonly domainComputer: HeatmapDomainComputer;
    readonly colorRange: ReadonlyArray<string>;
    readonly domainOverrides?: HeatmapDomainOverrides;
    readonly maxTileExtent?: HeatmapTileExtent;
}
