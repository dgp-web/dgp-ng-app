import * as d3 from "d3";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";

export function drawBoxPlot(payload: {
    readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box, SVGElement, BoxGroup>;
    readonly d3Scales: BoxPlotScales;
}, config = defaultBoxPlotConfig) {

    const xSubgroupKVS = payload.d3Scales.xAxisSubgroupKVS;
    const yAxis = payload.d3Scales.yAxisScale;
    const d3OnGroupDataEnter = payload.d3OnGroupDataEnter;

    d3OnGroupDataEnter.append("line")
        .attr("x1", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() / 2;
        })
        .attr("x2", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() / 2;
        })
        .attr("y1", (d) => {
            return yAxis(d.quantiles.min);
        })
        .attr("y2", (d) => {
            return yAxis(d.quantiles.lower);
        })
        .attr("stroke", x => x.colorHex)
        .style("stroke-width", 2);

    d3OnGroupDataEnter.append("line")
        .attr("x1", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() / 2;
        })
        .attr("x2", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() / 2;
        })
        .attr("y1", (d) => {
            return yAxis(d.quantiles.upper);
        })
        .attr("y2", (d) => {
            return yAxis(d.quantiles.max);
        })
        .attr("stroke", x => x.colorHex) // ???
        .style("stroke-width", 2);

    d3OnGroupDataEnter.append("rect")
        .attr("x", d => xSubgroupKVS[d.boxGroupId](d.boxId))
        .attr("y", (d) => {
            return (yAxis(d.quantiles.upper));
        })
        .attr("height", (d) => {

            return Math.abs(
                (yAxis(d.quantiles.lower) - yAxis(d.quantiles.upper))
            );
        })
        .attr("width", d => xSubgroupKVS[d.boxGroupId].bandwidth())
        .attr("stroke", x => x.colorHex)
        .attr("fill", x => x.colorHex + "66")
        .style("stroke-width", 2);

    d3OnGroupDataEnter.append("line")
        .attr("x1", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() * 0.25;
        })
        .attr("x2", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() * 0.75;
        })
        .attr("y1", (d) => {
            return yAxis(d.quantiles.min);
        })
        .attr("y2", (d) => {
            return yAxis(d.quantiles.min);
        })
        .attr("stroke", x => x.colorHex)
        .style("stroke-width", 2);

    d3OnGroupDataEnter.append("line")
        .attr("x1", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() * 0.25;
        })
        .attr("x2", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth() * 0.75;
        })
        .attr("y1", (d) => {
            return yAxis(d.quantiles.max);
        })
        .attr("y2", (d) => {
            return yAxis(d.quantiles.max);
        })
        .attr("stroke", x => x.colorHex)
        .style("stroke-width", 2);

    d3OnGroupDataEnter.append("line")
        .attr("x1", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId);
        })
        .attr("x2", (d: Box) => {
            return xSubgroupKVS[d.boxGroupId](d.boxId) + xSubgroupKVS[d.boxGroupId].bandwidth();
        })
        .attr("y1", (d) => {
            return yAxis(d.quantiles.median);
        })
        .attr("y2", (d) => {
            return yAxis(d.quantiles.median);
        })
        .attr("stroke", x => x.colorHex)
        .style("stroke-width", 2);
}
