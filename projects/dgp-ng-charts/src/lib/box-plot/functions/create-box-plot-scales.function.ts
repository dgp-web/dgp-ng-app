import { BoxGroup, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants";
import * as _ from "lodash";
import * as d3 from "d3";
import { getYAxisLimitsWithOffset } from "./get-y-axis-limits-with-offset.function";

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
