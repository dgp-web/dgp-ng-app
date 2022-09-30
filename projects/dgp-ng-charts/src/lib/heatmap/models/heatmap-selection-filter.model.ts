import { HeatmapSelection } from "./heatmap-selection.model";

/**
 * Adjusts the selection, e.g. by rounding values
 */
export type HeatmapSelectionFitter = (payload: HeatmapSelection) => Promise<HeatmapSelection>;
