import * as _ from "lodash";
import * as d3 from "d3";
import { Axis, ScaleLinear, ScaleLogarithmic } from "d3";
import { ConnectedScatterGroup } from "../models";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { notNullOrUndefined } from "dgp-ng-app";
import { formatLogTick, getYAxisLimitsWithOffset } from "../../shared/functions";
import { ScaleType } from "../../shared/models";
import { logTickValues } from "../../shared/constants";

export function createConnectedScatterPlotScales(payload: {
    readonly connectedScatterGroups: ReadonlyArray<ConnectedScatterGroup>;
    readonly xAxisMin?: number;
    readonly xAxisMax?: number;
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
    readonly yAxisScaleType?: ScaleType;
    readonly containerWidth: number;
    readonly containerHeight: number;
}, config = defaultConnectedScatterPlotConfig): ConnectedScatterPlotScales {

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

    const dataAreaWidth = payload.containerWidth
        - config.margin.left
        - config.margin.right;

    const dataAreaHeight = payload.containerHeight
        - config.margin.top
        - config.margin.bottom;

    const yAxisDomain = getYAxisLimitsWithOffset({
        limitsFromValues: {
            min: yMin,
            max: yMax
        }
    }, config);


    let yAxisScale: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;

    switch (payload.yAxisScaleType) {
        default:
        case ScaleType.Linear:
            yAxisScale = d3.scaleLinear()
                .domain([yAxisDomain.max, yAxisDomain.min])
                .range([0, dataAreaHeight]);
            break;
        case ScaleType.Logarithmic:
            yAxisScale = d3.scaleLog()
                .domain([(yMax >= 0 ? yMax : 0.001), (yMin >= 0 ? yMin : 0.001)])
                .range([0, dataAreaHeight]);
            break;
    }

    const xAxisScale = d3.scaleLinear()
        .domain([xMin, xMax]) // TODO
        .range([0, dataAreaWidth]);

    const xAxis = d3.axisBottom(xAxisScale);
    let yAxis: Axis<any>;
    switch (payload.yAxisScaleType) {
        default:
        case ScaleType.Linear:
            yAxis = d3.axisLeft(yAxisScale);
            break;
        case ScaleType.Logarithmic:
            yAxis = d3.axisLeft(yAxisScale)
                .tickValues(logTickValues)
                .tickFormat(formatLogTick);
            break;
    }

    return {
        xAxis,
        yAxis,
        xAxisScale,
        yAxisScale,
        containerHeight: payload.containerHeight,
        containerWidth: payload.containerWidth,
        dataAreaHeight,
        dataAreaWidth,
        chartMargin: config.margin
    };

}
