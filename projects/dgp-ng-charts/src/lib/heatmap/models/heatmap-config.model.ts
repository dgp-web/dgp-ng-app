import { SharedChartConfig } from "../../shared/models";
import { HeatmapDomainOverrides } from "./heatmap-domain-overrides.model";
import { HeatmapDomainComputer } from "./heatmap-domain-computer.model";

export interface HeatmapConfig extends SharedChartConfig {
    readonly domainComputer: HeatmapDomainComputer;
    readonly colorRange: ReadonlyArray<string>;
    readonly domainOverrides?: HeatmapDomainOverrides;
}
