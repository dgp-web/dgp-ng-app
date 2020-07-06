import * as d3 from "d3";
import { createGuid, notNullOrUndefined } from "dgp-ng-app";
import * as _ from "lodash";
import { Box, BoxGroup, BoxPlotScales, BoxValues, Limits } from "./models";
import { defaultBoxPlotConfig } from "./constants";

export function computeBoxFromValues(payload: {
    readonly values: BoxValues;
    readonly boxId?: string;
    readonly boxGroupId?: string;
    readonly colorHex?: string;
}): Box {

    const values = payload.values.originalValues
        .filter(notNullOrUndefined)
        .sort();

    const lowerQuantile = d3.quantile(values, 0.25);
    const upperQuantile = d3.quantile(values, 0.75);

    const interquartileRange = upperQuantile - lowerQuantile;
    // This is a special case of computing outliers
    const outlierLowerLimit = lowerQuantile - 3 * interquartileRange;
    const outlierUpperLimit = upperQuantile + 3 * interquartileRange;

    const valuesForOutlierComputation = values.filter(x =>
        x <= outlierUpperLimit
        && x >= outlierLowerLimit
    );

    return {
        boxId: payload.boxId || createGuid(),
        boxGroupId: payload.boxGroupId || createGuid(),
        colorHex: payload.colorHex || "#3000f0",
        boxValuesId: payload.values.boxValuesId,
        quantiles: {
            min: _.min(valuesForOutlierComputation),
            lower: lowerQuantile,
            median: d3.median(values),
            upper: upperQuantile,
            max: _.max(valuesForOutlierComputation)
        },
        outliers: values.filter(x =>
            x > outlierUpperLimit
            || x < outlierLowerLimit
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

    return {
        xAxis,
        yAxis,
        xAxisSubgroup: d3.scaleBand()
            .domain(boxIds)
            .range([0, xAxis.bandwidth()])
            .padding(0.05)
    };

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
