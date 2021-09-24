import * as d3 from "d3";
import { axisTickFormattingService } from "./axis-tick-formatting.service";
import { notNullOrUndefined } from "dgp-ng-app";

function createChart(payload: {
    readonly containerWidth: number;
    readonly containerHeight: number;
    readonly nativeElement: any;
    readonly marginLeft: any;
    readonly marginTop: any;
}, config = {
    chartClass: "chart-svg"
}): d3.Selection<SVGElement, {}, null, undefined> {
    return d3.select(payload.nativeElement)
        .append("svg")
        .attr("width", payload.containerWidth)
        .attr("height", payload.containerHeight)
        .attr("class", config.chartClass)
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
    readonly yAxisTickValues?: ReadonlyArray<number>;
}, config = {
    axisClass: "chart__y-axis"
}) {

    let axisLeft = d3.axisLeft(payload.yAxisScale);

    if (notNullOrUndefined(payload.yAxisTickValues)) axisLeft = axisLeft.tickValues(payload.yAxisTickValues as any);

    payload.svg.append("g")
        .attr("class", config.axisClass)
        .call(axisLeft.tickFormat(x => axisTickFormattingService.formatValueTick(x as number)));
}

function addCategoricalXAxisToChart(payload: {
    readonly svg: d3.Selection<SVGElement, {}, null, undefined>;
    readonly xAxisScale: d3.ScaleBand<string>;
    readonly yAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly xAxisTickValues?: ReadonlyArray<string>;
    readonly tickFormatter?: (x: string) => string;
}, config = {
    axisClass: "chart__x-axis"
}) {

    let axisBottom = d3.axisBottom(payload.xAxisScale);

    if (notNullOrUndefined(payload.xAxisTickValues)) axisBottom = axisBottom.tickValues(payload.xAxisTickValues as any);
    if (notNullOrUndefined(payload.tickFormatter)) axisBottom = axisBottom.tickFormat(x => payload.tickFormatter(x as any));

    payload.svg.append("g")
        .attr("class", config.axisClass)
        .attr("transform", "translate(0," + payload.yAxisScale.range()[0] + ")")
        .call(axisBottom);
}

function addContinuousXAxisToChart(payload: {
    readonly svg: d3.Selection<SVGElement, {}, null, undefined>;
    readonly xAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly yAxisScale: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    readonly xAxisTickValueCount?: number;
    readonly isLogarithmic?: boolean;
    readonly tickFormatter?: (x: number) => string;
}, config = {
    axisClass: "chart__x-axis"
}) {

    let axisBottom = d3.axisBottom(payload.xAxisScale);

    if (!payload.isLogarithmic) {
        if (notNullOrUndefined(payload.xAxisTickValueCount)) axisBottom = axisBottom.ticks(Math.ceil(payload.xAxisTickValueCount));
        if (notNullOrUndefined(payload.tickFormatter)) axisBottom = axisBottom.tickFormat(x => payload.tickFormatter(x as any));
    } else {

        axisBottom = axisBottom.ticks(payload.xAxisTickValueCount, x => payload.tickFormatter(x as any));
    }

    payload.svg.append("g")
        .attr("class", config.axisClass)
        .attr("transform", "translate(0," + payload.yAxisScale.range()[0] + ")")
        .call(axisBottom);

}

export const d3ChartConstructionService = {
    createChart,
    addCategoricalXAxisToChart,
    addContinuousXAxisToChart,
    addYAxisToChart
};
