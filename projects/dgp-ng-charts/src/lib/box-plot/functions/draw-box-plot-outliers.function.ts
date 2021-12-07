import * as d3 from "d3";
import { Box, BoxGroup, BoxOutlier, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";
import { getJitter } from "./get-jitter.function";

export function drawBoxPlotOutliers(payload: {
    readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box, SVGElement, BoxGroup>;
    readonly d3Scales: BoxPlotScales
}, config = defaultBoxPlotConfig) {

    return payload.d3OnGroupDataEnter
        .selectAll("circle")
        .data(datum => datum.outliers.map((x, outlierIndex) => ({
                boxId: datum.boxId,
                boxGroupId: datum.boxGroupId,
                colorHex: datum.colorHex,
                outlierIndex,
                value: x
            } as BoxOutlier))
        )
        .enter()
        .append("circle")
        .attr("cx", x => payload.d3Scales.xAxisSubgroupKVS[x.boxGroupId](x.boxId)
            + payload.d3Scales.xAxisSubgroupKVS[x.boxGroupId].bandwidth() / 2
            + getJitter(x.boxId + x.value, config)
        )
        .attr("cy", x => payload.d3Scales.yAxisScale(x.value))
        .attr("r", 3)
        .style("fill", x => x.colorHex);

}
