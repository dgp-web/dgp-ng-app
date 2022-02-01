import * as _ from "lodash";
import * as d3 from "d3";
import { ScaleLinear, ScaleLogarithmic } from "d3";
import { ConnectedScatterGroup, ConnectedScatterPlotControlLine } from "../models";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { createCardinalYAxis } from "../../shared/functions";
import { CardinalYAxis, ScaleType } from "../../shared/models";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";

export function createConnectedScatterPlotScales(payload: {
    readonly connectedScatterGroups: ReadonlyArray<ConnectedScatterGroup>;
    readonly controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly xAxisMin?: number;
    readonly xAxisMax?: number;
    readonly xAxisTicks?: number;
    readonly xAxisTickFormat?: (x: string) => string;
    readonly containerWidth: number;
    readonly containerHeight: number;
} & CardinalYAxis, config = defaultConnectedScatterPlotConfig): ConnectedScatterPlotScales {

    const valuesForXExtremumComputation = new Array<number>();
    const valuesForYExtremumComputation = new Array<number>();

    payload.connectedScatterGroups.forEach((currentValue) => {
        currentValue.series.forEach(series => {
            series.dots.forEach(dot => {
                valuesForXExtremumComputation.push(dot.x);
                valuesForYExtremumComputation.push(dot.y);
            });
        });
    });

    if (notNullOrUndefined(payload.controlLines)) {
        payload.controlLines.forEach(controlLine => {
            if (isNullOrUndefined(controlLine)) return;
            valuesForYExtremumComputation.push(controlLine.value);
        });
    }

    let xMin = _.min(valuesForXExtremumComputation);
    let xMax = _.max(valuesForXExtremumComputation);

    if (notNullOrUndefined(payload.xAxisMin)) {
        xMin = payload.xAxisMin;
    }
    if (notNullOrUndefined(payload.xAxisMax)) {
        xMax = payload.xAxisMax;
    }


    let yMin = _.min(valuesForYExtremumComputation);
    let yMax = _.max(valuesForYExtremumComputation);

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
     }, config);
 */
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

    const dataAreaWidth = payload.containerWidth
        - marginLeft
        - config.margin.right;

    const dataAreaHeight = payload.containerHeight
        - config.margin.top
        - config.margin.bottom;


    let yAxisScale: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;

    switch (payload.yAxisScaleType) {
        default:
        case ScaleType.Linear:
            yAxisScale = d3.scaleLinear()
                .domain([yMax, yMin])
                .range([0, dataAreaHeight]);
            break;
        case ScaleType.Logarithmic:
            yAxisScale = d3.scaleLog()
                .domain([(yMax >= 0 ? yMax : 0.001), (yMin >= 0 ? yMin : 0.001)])
                .range([0, dataAreaHeight]);
            break;
    }

    const xAxisScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0, dataAreaWidth]);

    let xAxis = d3.axisBottom(xAxisScale);
    if (notNullOrUndefined(payload.xAxisTicks)) {
        xAxis = xAxis
            .ticks(payload.xAxisTicks);
    } else {
        const xTickCount = axisTickFormattingService.estimateContinuousXAxisTickCount({
            containerWidth: payload.containerWidth
        });
        xAxis = xAxis
            .ticks(xTickCount);
    }

    if (notNullOrUndefined(payload.xAxisTickFormat)) {
        xAxis = xAxis.tickFormat(payload.xAxisTickFormat as any);
    }


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
        containerHeight: payload.containerHeight,
        containerWidth: payload.containerWidth,
        dataAreaHeight,
        dataAreaWidth,
        chartMargin: {
            ...config.margin,
            left: marginLeft
        }
    };

}

