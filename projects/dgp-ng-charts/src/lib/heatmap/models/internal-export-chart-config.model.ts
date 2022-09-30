import { ExportChartConfig } from "./export-chart-config.model";

export interface InternalExportChartConfig extends ExportChartConfig {
    readonly chartTitle?: string;
    readonly xAxisTitle?: string;
    readonly yAxisTitle?: string;
    readonly serializedChartImageUrl: string;
    readonly serializedCanvasDataUrl?: string;
    readonly serializedRightLegend?: string;
    readonly serializedBottomLegend?: string;
}
