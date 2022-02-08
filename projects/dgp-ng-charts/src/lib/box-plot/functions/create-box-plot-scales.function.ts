import { BoxGroup, BoxPlotControlLine, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";
import * as _ from "lodash";
import * as d3 from "d3";
import { ScaleLinear, ScaleLogarithmic } from "d3";
import { createCardinalYAxis, createYAxisScale } from "../../shared/functions";
import { notNullOrUndefined } from "dgp-ng-app";
import { CardinalYAxis, ScaleType } from "../../shared/models";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";

export function createBoxPlotScales(payload: {
    readonly boxGroups: ReadonlyArray<BoxGroup>;
    readonly controlLines?: ReadonlyArray<BoxPlotControlLine>;
    readonly containerWidth: number;
    readonly containerHeight: number;
} & CardinalYAxis, config = defaultBoxPlotConfig): BoxPlotScales {

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

    if (notNullOrUndefined(payload.controlLines)) {
        payload.controlLines.forEach(controlLine => {
            valuesForExtremumComputation.push(controlLine.value);
        });
    }

    let yMin = _.min(valuesForExtremumComputation);
    let yMax = _.max(valuesForExtremumComputation);

    if (notNullOrUndefined(payload.yAxisMin)) {
        yMin = payload.yAxisMin;
    }
    if (notNullOrUndefined(payload.yAxisMax)) {
        yMax = payload.yAxisMax;
    }

    /* const yAxisDomain = getYAxisLimitsWithOffset({
         limitsFromValues: {
             min: yMin,
             max: yMax
         }
     }, config);*/

    let marginLeft = config.margin.left;

    if (payload.yAxisScaleType !== ScaleType.Logarithmic) {

        const referenceYDomainLabelLength = _.max(
            [yMin, yMax].map(x => {
                return x.toPrecision(3).length;
                // return d3.format("~r")(x).length;
            })
        );

        const estimatedNeededMaxYTickWidthPx = referenceYDomainLabelLength * 10;

        marginLeft = config.margin.left >= estimatedNeededMaxYTickWidthPx
            ? config.margin.left
            : estimatedNeededMaxYTickWidthPx;
    }

    const barAreaWidth = payload.containerWidth
        - marginLeft
        - config.margin.right;

    const barAreaHeight = payload.containerHeight
        - config.margin.top
        - config.margin.bottom;

    const yAxisScale = createYAxisScale({...payload, dataAreaHeight: barAreaHeight, yMin, yMax});

    const xAxisScale = d3.scaleBand()
        .domain(boxGroupKeys)
        .range([0, barAreaWidth])
        .padding(0.2);

    const xAxisSubgroupKVS = payload.boxGroups.reduce((previousValue, currentValue) => {

        previousValue[currentValue.boxGroupId] = d3.scaleBand() // TODO: We need to create sub groups based on crap
            .domain(currentValue.boxes.map(x => x.boxId))
            .range([0, xAxisScale.bandwidth()])
            .padding(0.05);

        return previousValue;

    }, {});

    const xAxisTickValues = axisTickFormattingService.trimCategoricalXAxisTicks({
        currentXAxisValues: xAxisScale.domain(),
        containerWidth: payload.containerWidth
    });

    const xAxis = d3.axisBottom(xAxisScale).tickValues(xAxisTickValues as any);

    const yAxis = createCardinalYAxis({
        yAxisScale,
        yAxisModel: payload,
        containerHeight: payload.containerHeight
    });

    return {
        xAxis,
        yAxis,
        xAxisScale,
        yAxisScale,
        xAxisSubgroupKVS,
        containerHeight: payload.containerHeight,
        containerWidth: payload.containerWidth,
        dataAreaHeight: barAreaHeight,
        dataAreaWidth: barAreaWidth,
        chartMargin: {
            ...config.margin,
            left: marginLeft
        },
        yAxisModel: {
            yAxisMax: payload.yAxisMax,
            yAxisMin: payload.yAxisMin,
            yAxisScaleType: payload.yAxisScaleType,
            yAxisStep: payload.yAxisStep,
            yAxisTickFormat: payload.yAxisTickFormat
        }
    };

}
