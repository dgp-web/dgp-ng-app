import * as _ from "lodash";
import * as d3 from "d3";
import { ConnectedScatterGroup } from "../models";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { getYAxisLimitsWithOffset } from "../../shared/functions";
import { notNullOrUndefined } from "dgp-ng-app";

export function createConnectedScatterPlotScales(payload: {
    readonly connectedScatterGroups: ReadonlyArray<ConnectedScatterGroup>;
    readonly xAxisMin?: number;
    readonly xAxisMax?: number;
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
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

    const yAxis = d3.scaleLinear()
        .domain([yAxisDomain.max, yAxisDomain.min])
        .range([0, dataAreaHeight]);

    const xAxis = d3.scaleLinear()
        .domain([xMin, xMax]) // TODO
        .range([0, dataAreaWidth]);

    return {
        xAxis,
        yAxis,
        containerHeight: payload.containerHeight,
        containerWidth: payload.containerWidth,
        dataAreaHeight,
        dataAreaWidth,
        chartMargin: config.margin
    };

}
