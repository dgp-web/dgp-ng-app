import * as _ from "lodash";
import * as d3 from "d3";
import { ConnectedScatterGroup } from "../models";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { getYAxisLimitsWithOffset } from "../../shared/functions";

export function createConnectedScatterPlotScales(payload: {
    readonly connectedScatterGroups: ReadonlyArray<ConnectedScatterGroup>;
    readonly containerWidth: number;
    readonly containerHeight: number;
}, config = defaultConnectedScatterPlotConfig): ConnectedScatterPlotScales {

    const valuesForYExtremumComputation = new Array<number>();
    const valuesForXExtremumComputation = new Array<number>();

    payload.connectedScatterGroups.forEach((currentValue) => {
        currentValue.series.forEach(bar => {

            // TODO: Collect values for x and

        });
    });

    const xMin = _.min(valuesForXExtremumComputation);
    const xMax = _.max(valuesForXExtremumComputation);

    const yMin = _.min(valuesForYExtremumComputation);
    const yMax = _.max(valuesForYExtremumComputation);

    const barAreaWidth = payload.containerWidth
        - config.margin.left
        - config.margin.right;

    const barAreaHeight = payload.containerHeight
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
        .range([0, barAreaHeight]);

    const xAxis = d3.scaleLinear()
        .domain([xMin, xMax]) // TODO
        .range([0, barAreaWidth]);

    return {
        xAxis,
        yAxis,
        containerHeight: payload.containerHeight,
        containerWidth: payload.containerWidth,
        barAreaHeight,
        barAreaWidth,
        chartMargin: config.margin
    };

}
