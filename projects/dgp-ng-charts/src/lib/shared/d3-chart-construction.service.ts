import * as d3 from "d3";
import { axisTickFormattingService } from "./axis-tick-formatting.service";

function createChart(payload: {
    readonly containerWidth: number;
    readonly containerHeight: number;
    readonly nativeElement: any;
    readonly marginLeft: any;
    readonly marginTop: any;
    readonly chartClass: any;
}): d3.Selection<SVGElement, {}, null, undefined> {
    return d3.select(payload.nativeElement)
        .append("svg")
        .attr("width", payload.containerWidth)
        .attr("height", payload.containerHeight)
        .attr("class", payload.chartClass)
        .append("g")
        .attr("transform",
            "translate(" + payload.marginLeft
            + ","
            + payload.marginTop
            + ")"
        );
}

function addYAxisToChart(payload: {
    readonly svg: d3.Selection<SVGElement, {}, null, undefined>;
    readonly yAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly yAxisTickValues: ReadonlyArray<number>;
    readonly axisClass: string;
}) {
    payload.svg.append("g")
        .attr("class", payload.axisClass)
        .call(d3.axisLeft(payload.yAxisScale)
            .tickValues(payload.yAxisTickValues as any)
            .tickFormat(x => axisTickFormattingService.formatValueTick(x as number))
        );
}

function addCategoricalXAxisToChart(payload: {
    readonly svg: d3.Selection<SVGElement, {}, null, undefined>;
    readonly xAxisScale: d3.ScaleBand<string>;
    readonly yAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly xAxisTickValues: ReadonlyArray<string>;
    readonly axisClass: string;
    readonly tickFormatter: (x: string) => string;
}) {
    payload.svg.append("g")
        .attr("class", payload.axisClass)
        .attr("transform", "translate(0," + payload.yAxisScale.range()[0] + ")")
        .call(d3.axisBottom(payload.xAxisScale)
            .tickValues(payload.xAxisTickValues as any)
            .tickFormat(x => payload.tickFormatter(x as any))
        );
}

export const d3ChartConstructionService = {
    createChart,
    addCategoricalXAxisToChart,
    addYAxisToChart
};
