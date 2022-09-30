export interface HeatmapSegment {
    readonly xStart: number;
    readonly xEnd: number;

    readonly yStart: number;
    readonly yEnd: number;

    readonly strokeColor?: string;
}
