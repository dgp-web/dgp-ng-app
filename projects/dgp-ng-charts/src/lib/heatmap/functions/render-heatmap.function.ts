import * as d3 from "d3";
import { notNullOrUndefined, Point } from "dgp-ng-app";
import * as _ from "lodash";
import { uniq } from "lodash";
import { Subject } from "rxjs";
import { HeatmapRendererPayload, HeatmapSelection, HeatmapTile } from "../models";
import { calculateTileExtent } from "./calculate-tile-extent.function";
import { drawHeatmapSegmentOnCanvas } from "./draw-heatmap-segment-on-canvas.function";

export function renderHeatmap(payload: HeatmapRendererPayload) {


    function extentEquals(
        extent1: [[number, number], [number, number]],
        extent2: [[number, number], [number, number]]
    ): boolean {
        return extent1[0][0] === extent2[0][0] &&
            extent1[0][1] === extent2[0][1] &&
            extent1[1][0] === extent2[1][0] &&
            extent1[1][1] === extent2[1][1];
    }

    // Labels of row and columns
    const columnValues = _.sortBy(uniq(payload.model.map(x => x.x)));

    const rowValues = _.sortBy(uniq(payload.model.map(x => x.y)));

    // Build X scales and axis:
    const xAxis = d3.scaleBand()
        .range([0, payload.drawD3ChartInfo.containerWidth])
        .domain(columnValues as any)
        .padding(0);

    payload.drawD3ChartInfo.svg.append("g")
        .attr("transform", "translate(0," + payload.drawD3ChartInfo.containerHeight + ")")
        .call(d3.axisBottom(xAxis)
            .tickValues([])
            .tickSize(0));

    // Build X scales and axis:
    const yAxis = d3.scaleBand()
        .range([0, payload.drawD3ChartInfo.containerHeight])
        .domain(rowValues as any)
        .padding(0);

    payload.drawD3ChartInfo.svg.append("g")
        .call(d3.axisLeft(yAxis)
            .tickValues([])
            .tickSize(0));

    // Helper function to constrain brush to tile extent
    function constrainBrushToTileExtent(
        extent: [[number, number], [number, number]],
        maxExtent: { width: number; height: number }
    ): [[number, number], [number, number]] | null {

        const brushX = extent[0][0];
        const brushY = extent[0][1];
        const brushWidth = extent[1][0] - extent[0][0];
        const brushHeight = extent[1][1] - extent[0][1];

        const coveredTileExtent = calculateTileExtent({
            brushX, brushY, brushWidth, brushHeight,
            xAxis, yAxis
        });

        if (coveredTileExtent.width <= maxExtent.width && coveredTileExtent.height <= maxExtent.height) {
            return extent; // No constraint needed
        }

        const bX = xAxis.bandwidth();
        const bY = yAxis.bandwidth();

        let newStartCol = coveredTileExtent.startCol;
        let newEndCol = coveredTileExtent.endCol;

        if (coveredTileExtent.width > maxExtent.width) {
            const centerCol = (coveredTileExtent.startCol + coveredTileExtent.endCol) / 2;
            newStartCol = Math.round(centerCol - (maxExtent.width - 1) / 2);
            newStartCol = Math.max(0, Math.min(columnValues.length - maxExtent.width, newStartCol));
            newEndCol = newStartCol + maxExtent.width - 1;
        }

        let newStartRow = coveredTileExtent.startRow;
        let newEndRow = coveredTileExtent.endRow;

        if (coveredTileExtent.height > maxExtent.height) {
            const centerRow = (coveredTileExtent.startRow + coveredTileExtent.endRow) / 2;
            newStartRow = Math.round(centerRow - (maxExtent.height - 1) / 2);
            newStartRow = Math.max(0, Math.min(rowValues.length - maxExtent.height, newStartRow));
            newEndRow = newStartRow + maxExtent.height - 1;
        }

        const minPixelX = Math.round(newStartCol * bX);
        const maxPixelX = Math.round((newEndCol + 1) * bX);
        const minPixelY = Math.round(newStartRow * bY);
        const maxPixelY = Math.round((newEndRow + 1) * bY);

        const targetWidth = maxPixelX - minPixelX;
        const targetHeight = maxPixelY - minPixelY;

        const constrainedWidth = Math.min(brushWidth, targetWidth);
        const constrainedHeight = Math.min(brushHeight, targetHeight);

        const centerX = brushX + brushWidth / 2;
        const centerY = brushY + brushHeight / 2;

        const newBrushX = Math.max(minPixelX, Math.min(
            maxPixelX - constrainedWidth,
            centerX - constrainedWidth / 2
        ));
        const newBrushY = Math.max(minPixelY, Math.min(
            maxPixelY - constrainedHeight,
            centerY - constrainedHeight / 2
        ));

        return [
            [newBrushX, newBrushY],
            [newBrushX + constrainedWidth, newBrushY + constrainedHeight]
        ];
    }

    const colorRange = payload.config.colorRange.map(x => d3.rgb(x));
    const domain = payload.config.domainComputer(payload.model, payload.config.domainOverrides);

    const rScale = d3.scaleLinear()
        .range(colorRange.map(x => x.r))
        .domain(domain as any);

    const gScale = d3.scaleLinear()
        .range(colorRange.map(x => x.g))
        .domain(domain as any);

    const bScale = d3.scaleLinear()
        .range(colorRange.map(x => x.b))
        .domain(domain as any);


    /**
     * Create canvas
     */
    const canvasD3Selection = d3.select(payload.nativeElement)
        .insert("canvas", ":first-child")
        .attr("width", xAxis.range()[1])
        .attr("height", yAxis.range()[1])
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0)
        .style("pointer-events", "none")
        .style("user-select", "none");

    const canvas = canvasD3Selection.node();
    const ctx = canvas.getContext("2d");

    /**
     * Draw tiles on canvas
     */
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const data32 = new Uint32Array(data.buffer);
    const bandwidthX = xAxis.bandwidth();
    const bandwidthY = yAxis.bandwidth();

    const xRangeMap = new Map<number, { start: number, end: number }>();
    columnValues.forEach((val, index) => {
        const x = xAxis(val.toString());
        if (x !== undefined && x !== null) {
            const start = Math.round(x);

            const nextVal = columnValues[index + 1];
            const nextX = nextVal !== undefined ? xAxis(nextVal.toString()) : null;
            const end = (nextX !== undefined && nextX !== null) ? Math.round(nextX) : width;

            xRangeMap.set(val as number, {
                start,
                end
            });
        }
    });

    const yRangeMap = new Map<number, { start: number, end: number }>();
    rowValues.forEach((val,index) => {
        const y = yAxis(val.toString());
        if (y !== undefined && y !== null) {
            const start = Math.round(y);
            const nextVal = rowValues[index + 1];
            const nextY = nextVal !== undefined ? yAxis(nextVal.toString()) : null;
            const end = (nextY !== undefined && nextY !== null) ? Math.round(nextY) : height;

            yRangeMap.set(val as number, { start, end });

        }
    });

    const lutSize = 1024;
    const colorLut = new Uint32Array(lutSize);
    const minVal = domain[0];
    const maxVal = domain[domain.length - 1];
    const range = maxVal - minVal;

    for (let i = 0; i < lutSize; i++) {
        const val = range === 0 ? minVal : minVal + (i / (lutSize - 1)) * range;
        const r = Math.round(rScale(val));
        const g = Math.round(gScale(val));
        const b = Math.round(bScale(val));
        colorLut[i] = (255 << 24) | (b << 16) | (g << 8) | r;
    }

    const model = payload.model;
    const modelLength = model.length;

    for (let i = 0; i < modelLength; i++) {
        const tile = model[i];
        const val = tile.value;

        if (val !== null && val !== undefined && !isNaN(val)) {
            const xRange = xRangeMap.get(tile.x);
            const yRange = yRangeMap.get(tile.y);

            if (xRange && yRange) {
                const lutIndex = range === 0 ? 0 : Math.min(lutSize - 1, Math.max(0, Math.floor(((val - minVal) / range) * (lutSize - 1))));
                const colorInt = colorLut[lutIndex];

                const xStart = xRange.start;
                const yStart = yRange.start;
                const xEnd = xRange.end;
                const yEnd = yRange.end;

                for (let iy = yStart; iy < yEnd; iy++) {
                    data32.fill(colorInt, iy * width + xStart, iy * width + xEnd);
                }
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);

    if (payload.segments) {
        payload.segments.forEach(drawHeatmapSegmentOnCanvas({ ctx, xAxis, yAxis }));
    }

    if (payload.selectionMode === "Brush") {

        const selectionPublisher = new Subject<HeatmapSelection>();

        const tileMap = new Map<string, HeatmapTile>();
        payload.model.forEach(t => {
            tileMap.set(`${t.x},${t.y}`, t);
        });

        const brush = d3.brush()
            .extent([[0, 0], [payload.drawD3ChartInfo.containerWidth, payload.drawD3ChartInfo.containerHeight]])
            .on("brush", function (event) {
                // Real-time constraint during brushing
                const extent = d3.event.selection;

                if (extent && payload.config.maxTileExtent) {
                    const constrainedExtent = constrainBrushToTileExtent(extent, payload.config.maxTileExtent);
                    if (constrainedExtent && !extentEquals(constrainedExtent, extent)) {
                        d3.select(this).call(brush.move, constrainedExtent);
                        return;
                    }
                }
            })
            .on("end", function (event) {

                const extent = d3.event.selection;

                const selection: HeatmapSelection = {
                    tiles: extent ? (() => {
                        const brushX = extent[0][0];
                        const brushY = extent[0][1];
                        const brushWidth = extent[1][0] - extent[0][0];
                        const brushHeight = extent[1][1] - extent[0][1];

                        const tileExtent = calculateTileExtent({
                            brushX, brushY, brushWidth, brushHeight,
                            xAxis, yAxis
                        });

                        const selectedTiles: HeatmapTile[] = [];

                        for (let i = tileExtent.startCol; i <= tileExtent.endCol; i++) {
                            for (let j = tileExtent.startRow; j <= tileExtent.endRow; j++) {
                                const xVal = columnValues[i];
                                const yVal = rowValues[j];
                                const tile = tileMap.get(`${xVal},${yVal}`);
                                if (tile) {
                                    selectedTiles.push(tile);
                                }
                            }
                        }

                        return selectedTiles;
                    })() : []
                };

                selectionPublisher.next(selection);

            });


        payload.drawD3ChartInfo.svg.call(brush as any);

        if (payload.selection && payload.selection.tiles) {

            const xValues = payload.selection.tiles.map(x => x.x);
            const yValues = payload.selection.tiles.map(x => x.y);

            const left = _.min(xValues);
            const right = _.max(xValues);

            const top = _.min(yValues);
            const bottom = _.max(yValues);

            const upperLeftCorner: Point = {
                x: left,
                y: top
            };
            const lowerRightCorner: Point = {
                x: right,
                y: bottom
            };

            if (notNullOrUndefined(upperLeftCorner.x)
                && notNullOrUndefined(upperLeftCorner.y)) {

                const xStartRange = xRangeMap.get(upperLeftCorner.x);
                const yStartRange = yRangeMap.get(upperLeftCorner.y);
                const xEndRange = xRangeMap.get(lowerRightCorner.x);
                const yEndRange = yRangeMap.get(lowerRightCorner.y);

                if (xStartRange && yStartRange && xEndRange && yEndRange) {
                    payload.drawD3ChartInfo.svg.call(brush.move as any, [
                        [xStartRange.start, yStartRange.start],
                        [xEndRange.end, yEndRange.end],
                    ]);
                }
            }

        }

        selectionPublisher.subscribe(selection => {
            payload.updateSelection(selection);
        });

    }

}

