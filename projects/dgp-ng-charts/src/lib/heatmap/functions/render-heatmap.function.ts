import * as d3 from "d3";
import { notNullOrUndefined, Point } from "dgp-ng-app";
import * as _ from "lodash";
import { uniq } from "lodash";
import { Subject } from "rxjs";
import { isRectangleOverlap } from "../../box-plot/functions";
import { HeatmapRendererPayload, HeatmapSelection, HeatmapTile } from "../models";
import { drawHeatmapSegmentOnCanvas } from "./draw-heatmap-segment-on-canvas.function";

type TileWithPosition = {
    tile: HeatmapTile;
    pixelX: number;
    pixelY: number;
    pixelWidth: number;
    pixelHeight: number;
};

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
    // Helper to calculate how many tiles the brush covers
    function calculateTileExtent(
        brushX: number,
        brushY: number,
        brushWidth: number,
        brushHeight: number
    ): { width: number; height: number } {

        // Find the range of tile indices covered by the brush
        const startCol = Math.floor(brushX / xAxis.bandwidth());
        const endCol = Math.ceil((brushX + brushWidth) / xAxis.bandwidth());
        const startRow = Math.floor(brushY / yAxis.bandwidth());
        const endRow = Math.ceil((brushY + brushHeight) / yAxis.bandwidth());

        return {
            width: Math.max(1, endCol - startCol),
            height: Math.max(1, endRow - startRow)
        };
    }

    // Helper function to constrain brush to tile extent
    function constrainBrushToTileExtent(
        extent: [[number, number], [number, number]],
        maxExtent: { width: number; height: number }
    ): [[number, number], [number, number]] | null {

        const brushX = extent[0][0];
        const brushY = extent[0][1];
        const brushWidth = extent[1][0] - extent[0][0];
        const brushHeight = extent[1][1] - extent[0][1];

        // Calculate how many tiles the current brush covers
        const coveredTileExtent = calculateTileExtent(brushX, brushY, brushWidth, brushHeight);

        if (coveredTileExtent.width <= maxExtent.width && coveredTileExtent.height <= maxExtent.height) {
            return extent; // No constraint needed
        }

        // Calculate maximum pixel dimensions based on tile extent
        const maxPixelWidth = maxExtent.width * xAxis.bandwidth();
        const maxPixelHeight = maxExtent.height * yAxis.bandwidth();

        // Constrain the brush dimensions
        const constrainedWidth = Math.min(brushWidth, maxPixelWidth);
        const constrainedHeight = Math.min(brushHeight, maxPixelHeight);

        // Keep brush centered on its current center
        const centerX = brushX + brushWidth / 2;
        const centerY = brushY + brushHeight / 2;

        const newBrushX = Math.max(0, Math.min(
            payload.drawD3ChartInfo.containerWidth - constrainedWidth,
            centerX - constrainedWidth / 2
        ));
        const newBrushY = Math.max(0, Math.min(
            payload.drawD3ChartInfo.containerHeight - constrainedHeight,
            centerY - constrainedHeight / 2
        ));

        return [
            [newBrushX, newBrushY],
            [newBrushX + constrainedWidth, newBrushY + constrainedHeight]
        ];
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
    columnValues.forEach(val => {
        const x = xAxis(val.toString());
        if (x !== undefined && x !== null) {
            xRangeMap.set(val as number, {
                start: Math.max(0, Math.round(x)),
                end: Math.min(width, Math.round(x + bandwidthX))
            });
        }
    });

    const yRangeMap = new Map<number, { start: number, end: number }>();
    rowValues.forEach(val => {
        const y = yAxis(val.toString());
        if (y !== undefined && y !== null) {
            yRangeMap.set(val as number, {
                start: Math.max(0, Math.round(y)),
                end: Math.min(height, Math.round(y + bandwidthY))
            });
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

        const tilesWithPositions: TileWithPosition[] = [];
        for (let i = 0; i < modelLength; i++) {
            const tile = model[i];
            const xRange = xRangeMap.get(tile.x);
            const yRange = yRangeMap.get(tile.y);
            if (xRange && yRange) {
                tilesWithPositions.push({
                    tile: tile,
                    pixelX: xRange.start,
                    pixelY: yRange.start,
                    pixelWidth: xRange.end - xRange.start,
                    pixelHeight: yRange.end - yRange.start
                });
            }
        }

        const quadtree = d3.quadtree<TileWithPosition>()
            .x(d => d.pixelX)
            .y(d => d.pixelY)
            .addAll(tilesWithPositions);

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

                        const selectedTileWrappers: TileWithPosition[] = [];

                        quadtree.visit((node, x1, y1, x2, y2) => {
                            if (brushX >= x2 || brushX + brushWidth <= x1 ||
                                brushY >= y2 || brushY + brushHeight <= y1) {
                                return true;
                            }

                            if (!node.length) {
                                const wrapper = (node as any).data as TileWithPosition;
                                if (wrapper && isRectangleOverlap(
                                    brushX, brushY, brushWidth, brushHeight,
                                    wrapper.pixelX, wrapper.pixelY, wrapper.pixelWidth, wrapper.pixelHeight
                                )) {
                                    selectedTileWrappers.push(wrapper);
                                }
                            }

                            return false;
                        });

                        return selectedTileWrappers.map(wrapper => wrapper.tile);
                    })() : []
                };

                selectionPublisher.next(selection);

            });


        payload.drawD3ChartInfo.svg.call(brush);

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
                    payload.drawD3ChartInfo.svg.call(brush.move, [
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

