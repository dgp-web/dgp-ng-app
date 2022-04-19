import * as _ from "lodash";
import * as d3 from "d3";
import { BarChartScales, BarGroup } from "../models";
import { defaultBarChartConfig } from "../constants";
import { axisTickFormattingService } from "./axis-tick-formatting.service";
import { createCardinalYAxis, createYAxisScale } from "../../shared/functions";
import { CardinalYAxis, ContainerSize, ScaleType } from "dgp-ng-charts";
import { notNullOrUndefined } from "dgp-ng-app";

// TODO: Homogenize with createBoxPlotScales
export function createBarChartScales(payload: {
    readonly barGroups: ReadonlyArray<BarGroup>;
} & ContainerSize & CardinalYAxis, config = defaultBarChartConfig): BarChartScales {

    const barGroupKeys = payload.barGroups.map(x => x.barGroupKey);

    const valuesForExtremumComputation = payload.barGroups.reduce((previousValue, currentValue) => {

        currentValue.bars.forEach(bar => {
            previousValue.push(bar.value);
        });

        return previousValue;
    }, new Array<number>());

    let yMin = _.min(valuesForExtremumComputation);
    let yMax = _.max(valuesForExtremumComputation);

    if (notNullOrUndefined(payload.yAxisMin)) {
        yMin = payload.yAxisMin;
    }
    if (notNullOrUndefined(payload.yAxisMax)) {
        yMax = payload.yAxisMax;
    }

    const dataAreaHeight = payload.containerHeight
        - config.margin.top
        - config.margin.bottom;

    const yAxisScale = createYAxisScale({...payload, dataAreaHeight, yMin, yMax});

    let marginLeft = config.margin.left;

    if (payload.yAxisScaleType !== ScaleType.Logarithmic) {
        /**
         * We retrieve the configured formatter or the implicit default
         * used by d3 which is scale.tickFormat()
         */
        const yAxisTickFormat = payload.yAxisTickFormat || yAxisScale.tickFormat();

        /**
         * Note: If this doesn't produce good results, then we can try to
         * add additional values between the extrema to estimate this length
         */
        const referenceYDomainLabelLength = _.max(
            [yMin, yMax].map(x => yAxisTickFormat(x).length)
        );

        const estimatedNeededMaxYTickWidthPx = referenceYDomainLabelLength * 10;

        marginLeft = config.margin.left >= estimatedNeededMaxYTickWidthPx
            ? config.margin.left
            : estimatedNeededMaxYTickWidthPx;
    }

    const dataAreaWidth = payload.containerWidth
        - marginLeft
        - config.margin.right;

    const xAxisScale = d3.scaleBand()
        .domain(barGroupKeys)
        .range([0, dataAreaWidth])
        .padding(0.2);

    const xAxisSubgroupKVS = payload.barGroups.reduce((previousValue, currentValue) => {

        previousValue[currentValue.barGroupKey] = d3.scaleBand() // TODO: We need to create sub groups based on crap
            .domain(currentValue.bars.map(x => x.barKey))
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
        dataAreaHeight,
        dataAreaWidth,
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
