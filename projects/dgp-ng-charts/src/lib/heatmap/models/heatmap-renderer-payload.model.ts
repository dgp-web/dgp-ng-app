import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { ChartSelectionMode } from "../../shared/models";
import { Many } from "data-modeling";
import { HeatmapSegment } from "./heatmap-segment.model";
import { HeatmapTile } from "./heatmap-tile.model";
import { HeatmapSelection } from "./heatmap-selection.model";
import { HeatmapConfig } from "./heatmap-config.model";
import { HeatmapSelectionFitter } from "./heatmap-selection-filter.model";


export interface HeatmapRendererPayload {
    readonly drawD3ChartInfo: DrawD3ChartPayload;
    readonly nativeElement: HTMLElement;
    readonly model: ReadonlyArray<HeatmapTile>;
    readonly config: HeatmapConfig;
    readonly selectionMode: ChartSelectionMode;
    readonly selection: HeatmapSelection;
    readonly selectionFitter?: HeatmapSelectionFitter;
    readonly segments?: Many<HeatmapSegment>;
    readonly updateSelection: (selection: HeatmapSelection) => void;
}

