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
        .padding(0.01);

    payload.drawD3ChartInfo.svg.append("g")
        .attr("transform", "translate(0," + payload.drawD3ChartInfo.containerHeight + ")")
        .call(d3.axisBottom(xAxis)
            .tickValues([])
            .tickSize(0));

    // Build X scales and axis:
    const yAxis = d3.scaleBand()
        .range([0, payload.drawD3ChartInfo.containerHeight])
        .domain(rowValues as any)
        .padding(0.01);

    payload.drawD3ChartInfo.svg.append("g")
        .call(d3.axisLeft(yAxis)
            .tickValues([])
            .tickSize(0));

    const colorScale = d3.scaleLinear()
        .range(payload.config.colorRange as any)
        .domain(payload.config.domainComputer(payload.model, payload.config.domainOverrides) as any);


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
    payload.model.forEach(tile => {

        ctx.beginPath();

        ctx.fillStyle = notNullOrUndefined(tile.value) && !isNaN(tile.value)
            ? colorScale(tile.value) as any
            : "transparent";
        ctx.fillRect(
            xAxis(tile.x.toString()),
            yAxis(tile.y.toString()),
            xAxis.bandwidth(),
            yAxis.bandwidth()
        );
        ctx.stroke();
        ctx.closePath();

    });

    if (payload.segments) {
        payload.segments.forEach(drawHeatmapSegmentOnCanvas({ ctx, xAxis, yAxis }));
    }

    if (payload.selectionMode === "Brush") {

        const selectionPublisher = new Subject<HeatmapSelection>();

        const tilesWithPositions: TileWithPosition[] = payload.model.map(tile => ({
            tile: tile,  // Original tile reference
            pixelX: xAxis(tile.x.toString()),
            pixelY: yAxis(tile.y.toString()),
            pixelWidth: xAxis.bandwidth(),
            pixelHeight: yAxis.bandwidth()
        }));

        const quadtree = d3.quadtree<TileWithPosition>()
            .x(d => d.pixelX)
            .y(d => d.pixelY)
            .addAll(tilesWithPositions);

        const brush = d3.brush()
            .extent([[0, 0], [payload.drawD3ChartInfo.containerWidth, payload.drawD3ChartInfo.containerHeight]])
            .on("brush", function (event) {
                // Real-time constraint during brushing
                const extent = d3.event.selection;
                console.log(payload.config.maxTileExtent);
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

                payload.drawD3ChartInfo.svg.call(brush.move, [
                    [
                        xAxis(upperLeftCorner.x.toString()),
                        yAxis(upperLeftCorner.y.toString())
                    ],
                    [
                        xAxis(lowerRightCorner.x.toString()),
                        yAxis(lowerRightCorner.y.toString())
                    ],
                ]);
            }

        }

        selectionPublisher.subscribe(selection => {
            payload.updateSelection(selection);
        });

    }

}

