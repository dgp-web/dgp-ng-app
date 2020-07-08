
export interface ChartMargin {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
}

export interface SharedChartConfig {
    readonly margin: ChartMargin;
}
