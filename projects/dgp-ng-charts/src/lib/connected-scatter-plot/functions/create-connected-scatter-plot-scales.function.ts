import * as _ from "lodash";
import { ConnectedScatterGroup, ConnectedScatterPlotControlLine } from "../models";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { createCardinalYAxis, createYAxisScale, tryResolveMarginLeft } from "../../shared/functions";
import { CardinalXAxis, CardinalYAxis } from "../../shared/models";
import { createCardinalXAxis } from "../../shared/functions/create-cardinal-x-axis.function";
import { createXAxisScale } from "../../shared/functions/create-x-axis-scale.function";
import { ControlLineAxis } from "../../stroke/models";

export function createConnectedScatterPlotScales(payload: {
    readonly connectedScatterGroups: ReadonlyArray<ConnectedScatterGroup>;
    readonly controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly containerWidth: number;
    readonly containerHeight: number;
} & CardinalXAxis & CardinalYAxis, config = defaultConnectedScatterPlotConfig): ConnectedScatterPlotScales {
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

            if (!controlLine.axis || controlLine.axis === ControlLineAxis.Y) {
                valuesForYExtremumComputation.push(controlLine.value);
            } else {
                valuesForXExtremumComputation.push(controlLine.value);
            }

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

    if (notNullOrUndefined(payload.yAxisTickValues)) {
        payload.yAxisTickValues.forEach(yTick => {
            valuesForYExtremumComputation.push(yTick);
        });
    }

    let yMin = _.min(valuesForYExtremumComputation);
    let yMax = _.max(valuesForYExtremumComputation);

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

    const marginLeft = tryResolveMarginLeft({
        yAxisModel: payload,
        yMin,
        yMax,
        config,
        yAxisScale,
        refTickCharWidth: config.refTickCharWidth
    });

    const dataAreaWidth = payload.containerWidth
        - marginLeft
        - config.margin.right;

    const xAxisScale = createXAxisScale({...payload, dataAreaWidth, xMin, xMax});

    const xAxis = createCardinalXAxis({
        xAxisScale,
        xAxisModel: payload,
        containerWidth: payload.containerWidth
    });

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
        },
        yAxisModel: {
            yAxisMax: payload.yAxisMax,
            yAxisMin: payload.yAxisMin,
            yAxisScaleType: payload.yAxisScaleType,
            yAxisStep: payload.yAxisStep,
            yAxisTickFormat: payload.yAxisTickFormat,
            yAxisTickValues: payload.yAxisTickValues
        },
        xAxisModel: {
            xAxisMax: payload.xAxisMax,
            xAxisMin: payload.xAxisMin,
            xAxisScaleType: payload.xAxisScaleType,
            xAxisStep: payload.xAxisStep,
            xAxisTickFormat: payload.xAxisTickFormat
        }
    };

}

