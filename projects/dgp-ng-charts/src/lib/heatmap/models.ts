import { DrawD3ChartPayload } from "../shared/chart.component-base";
import { ChartSelectionMode, SharedChartConfig } from "../shared/models";
import { Many } from "data-modeling";

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

    readonly rightLegend?: HTMLElement;
    readonly bottomLegend?: HTMLElement;
}

export interface InternalExportChartConfig extends ExportChartConfig {
    readonly chartTitle?: string;
    readonly xAxisTitle?: string;
    readonly yAxisTitle?: string;
    readonly serializedChartImageUrl: string;
    readonly serializedCanvasDataUrl?: string;
    readonly serializedRightLegend?: string;
    readonly serializedBottomLegend?: string;
}

/**
 * Adjusts the selection, e.g. by rounding values
 */
export type HeatmapSelectionFitter = (payload: HeatmapSelection) => Promise<HeatmapSelection>;

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

export interface HeatmapSegment {
    readonly startX: number;
    readonly endX: number;

    readonly startY: number;
    readonly endY: number;
}
