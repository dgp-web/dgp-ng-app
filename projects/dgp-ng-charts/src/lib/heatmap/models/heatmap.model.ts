import { HeatmapTile } from "./heatmap-tile.model";
import { HeatmapConfig } from "./heatmap-config.model";
import { ExportChartConfig } from "./export-chart-config.model";
import { HeatmapSelection } from "./heatmap-selection.model";
import { Many } from "data-modeling";
import { HeatmapSegment } from "./heatmap-segment.model";
import { ChartBase } from "../../shared/chart.component-base";


export interface Heatmap extends ChartBase {
    readonly config?: HeatmapConfig;
    readonly exportConfig?: ExportChartConfig;
    readonly selection?: HeatmapSelection;
    readonly model: Many<HeatmapTile>;
    readonly segments?: Many<HeatmapSegment>;
}
