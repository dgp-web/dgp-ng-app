import { HeatmapConfig } from "../models/heatmap-config.model";
import { defaultHeatmapConfig } from "./default-heatmap-config.constant";
import { defaultHeatmapDomainComputer } from "./default-heatmap-domain-computer.constant";
import { defaultColorRange } from "./default-color-range.constant";

export const defaultDgpHeatmapConfig: HeatmapConfig = {
    ...defaultHeatmapConfig,
    margin: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    domainComputer: defaultHeatmapDomainComputer,
    colorRange: defaultColorRange,
    domainOverrides: {
        min: null,
        median: null,
        max: null
    }
};
