import { DrawD3ChartPayload } from "../shared/chart.component-base";
import { ChartSelectionMode, SharedChartConfig } from "../shared/models";

export interface HeatmapDomainOverrides {
    readonly min?: number;
    readonly median?: number;
    readonly max?: number;
}

export type DomainComputer<TModel> = (model: TModel, overrides?: HeatmapDomainOverrides) => ReadonlyArray<number>;
export type HeatmapDomainComputer = DomainComputer<ReadonlyArray<HeatmapTile>>;

export interface HeatmapTile {
    readonly x: number;
    readonly y: number;
    readonly value: number;
}


export interface HeatmapSelection {
    readonly tiles?: ReadonlyArray<HeatmapTile>;
}


export interface HeatmapConfig extends SharedChartConfig {
    readonly domainComputer: HeatmapDomainComputer;
    readonly colorRange: ReadonlyArray<string>;
    readonly domainOverrides?: HeatmapDomainOverrides;
}

export interface HeatmapModel {
    readonly tiles: ReadonlyArray<HeatmapTile>;
}

export interface HeatmapLegend {
    readonly min: number;
    readonly median: number;
    readonly max: number;
}


export interface ExportChartConfig {
    readonly chartTitle?: string;
    readonly xAxisTitle?: string;
    readonly yAxisTitle?: string;
}

export interface InternalExportChartConfig extends ExportChartConfig {
    readonly chartTitle?: string;
    readonly xAxisTitle?: string;
    readonly yAxisTitle?: string;
    readonly serializedChartImageUrl: string;
    readonly serializedCanvasDataUrl?: string;
    readonly serializedLegend?: string;
}


export interface HeatmapRendererPayload {
    readonly drawD3ChartInfo: DrawD3ChartPayload;
    readonly nativeElement: HTMLElement;
    readonly model: ReadonlyArray<HeatmapTile>;
    readonly config: HeatmapConfig;
    readonly selectionMode: ChartSelectionMode;
    readonly selection: HeatmapSelection;
    readonly updateSelection: (selection: HeatmapSelection) => void;
}
