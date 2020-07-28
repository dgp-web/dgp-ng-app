import * as d3 from "d3";

export interface DrawHorizontalLinePayload {
    readonly svg: d3.Selection<SVGElement, unknown, null, undefined>;
    readonly xAxisScale: d3.ScaleContinuousNumeric<any, any> | d3.ScaleBand<any>;
    readonly yAxisScale: d3.ScaleContinuousNumeric<any, any>;
    readonly lineYValue: number;
}

export interface DrawHorizontalLineConfig {
    readonly strokeColor?: string;
    readonly strokeDasharray?: any;
    readonly  strokeWidth?: any;
}

export const defaultDrawHorizontalLineConfig: DrawHorizontalLineConfig = {
    strokeColor: "#0000ff",
    strokeDasharray: ("16, 8"),
    strokeWidth: ("16, 8")
};

function drawHorizontalLine(
    payload: DrawHorizontalLinePayload,
    config: Partial<DrawHorizontalLineConfig> = defaultDrawHorizontalLineConfig
) {

    const actualConfig: DrawHorizontalLineConfig = {
        ...defaultDrawHorizontalLineConfig,
        ...config
    };

    payload.svg.append("line")
        .attr("x1", payload.xAxisScale.range()[0])
        .attr("x2", payload.xAxisScale.range()[1])
        .attr("y1", payload.yAxisScale(payload.lineYValue))
        .attr("y2", payload.yAxisScale(payload.lineYValue))
        .attr("stroke", actualConfig.strokeColor)
        .style("stroke-dasharray", actualConfig.strokeDasharray)
        .style("stroke-width", actualConfig.strokeWidth);
}

export const chartLineDrawingService = {
    drawHorizontalLine
};
