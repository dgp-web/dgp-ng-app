import { ScaleBand } from "d3";
import { HeatmapSegment } from "../models/heatmap-segment.model";

export function drawHeatmapSegmentOnCanvas(payload: {
    readonly ctx: CanvasRenderingContext2D;
    readonly xAxis: ScaleBand<string>;
    readonly yAxis: ScaleBand<string>;
}) {

    return (segment: HeatmapSegment) => {

        const ctx = payload.ctx;
        const xAxis = payload.xAxis;
        const yAxis = payload.yAxis;

        ctx.beginPath();

        const xStart = xAxis(segment.xStart.toString());
        const xEnd = xAxis(segment.xEnd.toString()) + xAxis.bandwidth();
        const yStart = yAxis(segment.yStart.toString());
        const yEnd = yAxis(segment.yEnd.toString()) + yAxis.bandwidth();

        ctx.fillStyle = "transparent";
        ctx.strokeStyle = segment.strokeColor || "#888888";

        ctx.strokeRect(xStart, yStart, xEnd, yEnd);

        ctx.stroke();
        ctx.closePath();
    };

}
