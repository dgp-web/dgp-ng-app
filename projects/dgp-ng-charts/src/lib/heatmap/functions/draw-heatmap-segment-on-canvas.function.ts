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

        ctx.fillStyle = "transparent";
        ctx.strokeStyle = segment.strokeColor || "#888888";

        const xLineWidth = Math.max(Math.min(yAxis.bandwidth() / 3, xAxis.bandwidth() / 3), 1);
        const yLineWidth = xLineWidth;

        const xStart = xAxis(segment.xStart.toString());
        const xEnd = xAxis(segment.xEnd.toString()) + xAxis.bandwidth();

        const yStart = yAxis(segment.yStart.toString());
        const yEnd = yAxis(segment.yEnd.toString()) + yAxis.bandwidth();

        ctx.lineWidth = xLineWidth;
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yStart);
        ctx.stroke();

        ctx.moveTo(xStart, yEnd);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();

        ctx.lineWidth = yLineWidth;
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xStart, yEnd);
        ctx.stroke();

        ctx.moveTo(xEnd, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();

        ctx.closePath();
    };

}
