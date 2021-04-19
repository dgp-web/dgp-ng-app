import * as d3 from "d3";
import { createGuid, notNullOrUndefined } from "dgp-ng-app";
import * as _ from "lodash";
import { Box, BoxGroup, BoxOutlier, BoxPlotScales, BoxValues, BrushCoordinates, Limits } from "./models";
import { defaultBoxPlotConfig } from "./constants";
import * as seedrandom from "seedrandom";

export function computeBoxFromValues(payload: {
    readonly values: BoxValues;
    readonly boxId?: string;
    readonly boxGroupId?: string;
    readonly colorHex?: string;
}): Box {

    const values = _.sortBy(payload.values.originalValues)
        .filter(notNullOrUndefined);

    const lowerQuantile = d3.quantile(values, 0.25);
    const median = d3.quantile(values, 0.5);
    const upperQuantile = d3.quantile(values, 0.75);

    const interquartileRange = upperQuantile - lowerQuantile;
    // This is a special case of computing outliers
    const outlierLowerLimit = lowerQuantile - 3 * interquartileRange;
    const outlierUpperLimit = upperQuantile + 3 * interquartileRange;

    const valuesForOutlierComputation = values.filter(x =>
        x <= outlierUpperLimit && x >= outlierLowerLimit
    );

    return {
        boxId: payload.boxId || createGuid(),
        boxGroupId: payload.boxGroupId || createGuid(),
        colorHex: payload.colorHex || "#3000f0",
        boxValuesId: payload.values.boxValuesId,
        quantiles: {
            min: _.min(valuesForOutlierComputation),
            lower: lowerQuantile,
            median,
            upper: upperQuantile,
            max: _.max(valuesForOutlierComputation)
        },
        outliers: values.filter(x =>
            x > outlierUpperLimit || x < outlierLowerLimit
        )
    };

}

export function createBoxPlotScales(payload: {
    readonly boxGroups: ReadonlyArray<BoxGroup>;
    readonly containerWidth: number;
    readonly containerHeight: number;
}, config = defaultBoxPlotConfig): BoxPlotScales {

    const boxGroupKeys = payload.boxGroups.map(x => x.boxGroupId);
    const boxIds = _.flatten(payload.boxGroups.map(x => x.boxes.map(y => y.boxId)));

    const valuesForExtremumComputation = payload.boxGroups.reduce((previousValue, currentValue) => {

        currentValue.boxes.forEach(box => {
            box.outliers.forEach(outlier => previousValue.push(outlier));
            const quantiles = [
                box.quantiles.max,
                box.quantiles.upper,
                box.quantiles.median,
                box.quantiles.lower,
                box.quantiles.min,
            ];
            quantiles.forEach(quantile => previousValue.push(quantile));
        });

        return previousValue;
    }, new Array<number>());

    const yMin = _.min(valuesForExtremumComputation);
    const yMax = _.max(valuesForExtremumComputation);

    // Compute reference margin left
    /*  const referenceYDomainLabelLength = _.max(
          [yAxisLimits.min, yAxisLimits.max].map(x => {
              return d3.format("~r")(x).length;
          })
      );*/

    /* const estimatedNeededMaxYTickWidthPx = referenceYDomainLabelLength * 10;

     const marginLeft = payload.config.margin.left >= estimatedNeededMaxYTickWidthPx
         ? payload.config.margin.left
         : estimatedNeededMaxYTickWidthPx;

     const barAreaWidth = payload.containerWidth
         - marginLeft
         - payload.dummyConfig.margin.right;

     const barAreaHeight = payload.containerHeight
         - payload.dummyConfig.margin.top
         - payload.dummyConfig.margin.bottom;
 */

    const barAreaWidth = payload.containerWidth
        - defaultBoxPlotConfig.margin.left
        - defaultBoxPlotConfig.margin.right;

    const barAreaHeight = payload.containerHeight
        - defaultBoxPlotConfig.margin.top
        - defaultBoxPlotConfig.margin.bottom;

    const yAxisDomain = getYAxisLimitsWithOffset({
        limitsFromValues: {
            min: yMin,
            max: yMax
        }
    }, config);

    const yAxis = d3.scaleLinear()
        .domain([yAxisDomain.max, yAxisDomain.min])
        .range([0, barAreaHeight]);

    const xAxis = d3.scaleBand()
        .domain(boxGroupKeys)
        .range([0, barAreaWidth])
        .padding(0.2);

    const xAxisSubgroupKVS = payload.boxGroups.reduce((previousValue, currentValue) => {

        previousValue[currentValue.boxGroupId] = d3.scaleBand() // TODO: We need to create sub groups based on crap
            .domain(currentValue.boxes.map(x => x.boxId))
            .range([0, xAxis.bandwidth()])
            .padding(0.05);

        return previousValue;

    }, {});

    return {
        xAxis,
        yAxis,
        xAxisSubgroupKVS,
        containerHeight: payload.containerHeight,
        containerWidth: payload.containerWidth,
        barAreaHeight,
        barAreaWidth,
        chartMargin: config.margin
    };

}


export function drawBoxPlot(payload: {
    readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box, SVGElement, BoxGroup>;
    readonly d3Scales: BoxPlotScales;
}, config = defaultBoxPlotConfig) {

    const xSubgroupKVS = payload.d3Scales.xAxisSubgroupKVS;
    const yAxis = payload.d3Scales.yAxis;
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
        .attr("cy", x => payload.d3Scales.yAxis(x.value))
        .attr("r", 3)
        .style("fill", x => x.colorHex);

}

export function getJitter(seed: string, config = defaultBoxPlotConfig): number {

    const jitterWidth = config.jitterWidth;

    const rdm = seedrandom.alea(seed);
    return -jitterWidth / 2 + rdm() * jitterWidth;

}

export function getOutlierXPosition(
    outlier: BoxOutlier,
    scales: BoxPlotScales,
    config = defaultBoxPlotConfig
): number {
    return scales.xAxis(outlier.boxGroupId.toString())
        + scales.xAxisSubgroupKVS[outlier.boxGroupId].bandwidth() / 2
        + scales.xAxisSubgroupKVS[outlier.boxGroupId](outlier.boxId.toString())
        + getJitter(outlier.boxId + outlier.value, config);
}

/**
 * Applies offset to limits
 */
export function getYAxisLimitsWithOffset(payload: {
    readonly limitsFromValues: Limits;
}, config = defaultBoxPlotConfig): Limits {

    const distance = Math.abs(payload.limitsFromValues.max - payload.limitsFromValues.min);

    return {
        max: payload.limitsFromValues.max + distance * config.cardinalScaleOffset,
        min: payload.limitsFromValues.min - distance * config.cardinalScaleOffset
    };
}

export function isBrushed(brushCoordinates: BrushCoordinates, cx: number, cy: number) {
    const x0 = brushCoordinates[0][0];
    const x1 = brushCoordinates[1][0];
    const y0 = brushCoordinates[0][1];
    const y1 = brushCoordinates[1][1];

    return x0 <= cx
        && cx <= x1
        && y0 <= cy
        && cy <= y1;
}
