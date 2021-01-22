import * as d3 from "d3";
import { isNullOrUndefined, notNullOrUndefined, Point } from "dgp-ng-app";
import * as _ from "lodash";
import { uniq } from "lodash";
import { of, Subject } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";
import { isBrushed } from "../box-plot/functions";
import { BrushCoordinates } from "../box-plot/models";
import { HeatmapRendererPayload, HeatmapSelection, HeatmapTile } from "./models";
import { d3TooltipService } from "./services/d3-tooltip.service";


export function heatmapHybridRenderer(payload: HeatmapRendererPayload) {

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

        ctx.fillStyle = colorScale(tile.value) as any;
        ctx.fillRect(
            xAxis(tile.x.toString()),
            yAxis(tile.y.toString()),
            xAxis.bandwidth(),
            yAxis.bandwidth()
        );
        ctx.stroke();
        ctx.closePath();

    });

    if (payload.selectionMode === "Brush") {

        const selectionPublisher = new Subject<BrushCoordinates>();

        const brush = d3.brush()
            .extent([[0, 0], [payload.drawD3ChartInfo.containerWidth, payload.drawD3ChartInfo.containerHeight]])
            .on("end", () => {
                selectionPublisher.next(d3.event.selection);
            });

        selectionPublisher.pipe(
            debounceTime(250),
            map(extent => ({
                tiles: payload.model.filter(x => isBrushed(
                    extent,
                    xAxis(x.x.toString()),
                    yAxis(x.y.toString())
                ))
            } as HeatmapSelection)),
            /*map(selection => {

                const xValues = selection.tiles.map(x => x.x);
                const yValues = selection.tiles.map(x => x.y);

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

                brush.extent([[
                    xAxis(upperLeftCorner.x.toString()),
                    yAxis(upperLeftCorner.y.toString())
                ], [
                    xAxis(lowerRightCorner.x.toString()),
                    yAxis(lowerRightCorner.y.toString())
                ]]);

                return selection;

            })*/
        )
            .subscribe(selection => {
                payload.updateSelection(selection);
            });


        payload.drawD3ChartInfo.svg.call(brush);

        if (payload.selection) {

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

    }

}


export function heatMapD3Renderer(payload: HeatmapRendererPayload) {

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

    const tileRefs = payload.drawD3ChartInfo.svg.selectAll()
        .data(payload.model as Array<HeatmapTile>, x => x.x.toString() + x.y.toString())
        .enter()
        .append("rect")
        .attr("x", x => xAxis(x.x.toString()))
        .attr("y", x => yAxis(x.y.toString()))
        .attr("width", xAxis.bandwidth())
        .attr("height", yAxis.bandwidth())
        .style("fill", x => colorScale(x.value));

    if (payload.selectionMode === "None") {

        const tooltip = d3TooltipService.createTooltip({
            nativeElement: payload.nativeElement
        });

        tileRefs.on("mouseover", function(x) {
            d3TooltipService.showTooltip({
                text: `(${x.y}, ${x.x}): ${x.value.toPrecision(3)}`,
                referenceD3Element: d3.select(this),
                tooltipD3Element: tooltip
            });
        })
            .on("mouseleave", function(x) {
                d3TooltipService.hideTooltip({tooltipD3Element: tooltip});
            });

    }

    if (payload.selectionMode === "Brush") {

        const brush = d3.brush()
            .extent([[0, 0], [payload.drawD3ChartInfo.containerWidth, payload.drawD3ChartInfo.containerHeight]])
            .on("start brush", () => {
                const extent = d3.event.selection;


                const tiles = tileRefs.filter(x => isBrushed(
                    extent,
                    xAxis(x.x.toString()),
                    yAxis(x.y.toString())
                ))
                    .data();

                payload.updateSelection({tiles});
            });

        payload.drawD3ChartInfo.svg.call(brush);

        if (payload.selection) {

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
}
