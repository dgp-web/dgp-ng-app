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


        payload.drawD3ChartInfo.svg.call(d3.brush);

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

                payload.drawD3ChartInfo.svg.call(d3.brush.move, [
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

