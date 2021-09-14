export interface Chart {
    readonly chartTitle: string;
    readonly yAxisTitle: string;
    readonly xAxisTitle: string;
}

export interface ChartMargin {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
}

export interface SharedChartConfig {
    readonly margin: ChartMargin;
}

export type ChartSelectionMode = "None" | "Brush";
