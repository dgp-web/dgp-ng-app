import * as _ from "lodash";
import * as d3 from "d3";
import { BarChartScales, BarGroup } from "../models";
import { defaultBarChartConfig } from "../constants";
import { getBarChartYAxisLimitsWithOffset } from "./get-bar-chart-y-axis-limits-with-offset.function";
import { axisTickFormattingService } from "./axis-tick-formatting.service";
import { getSmartTicks } from "./get-smart-ticks.function";

export function createBarChartScales(payload: {
    readonly barGroups: ReadonlyArray<BarGroup>;
    readonly containerWidth: number;
    readonly containerHeight: number;
}, config = defaultBarChartConfig): BarChartScales {

    const barGroupKeys = payload.barGroups.map(x => x.barGroupKey);
    const barIds = _.flatten(payload.barGroups.map(x => x.bars.map(y => y.barKey)));

    const valuesForExtremumComputation = payload.barGroups.reduce((previousValue, currentValue) => {

        currentValue.bars.forEach(bar => {
            previousValue.push(bar.value);
        });

        return previousValue;
    }, new Array<number>());

    const yMin = _.min(valuesForExtremumComputation);
    const yMax = _.max(valuesForExtremumComputation);

    const barAreaWidth = payload.containerWidth
        - defaultBarChartConfig.margin.left
        - defaultBarChartConfig.margin.right;

    const barAreaHeight = payload.containerHeight
        - defaultBarChartConfig.margin.top
        - defaultBarChartConfig.margin.bottom;

    const yAxisDomain = getBarChartYAxisLimitsWithOffset({
        limitsFromValues: {
            min: 0,
            max: yMax
        }
    }, config);

    const yAxisScale = d3.scaleLinear()
        .domain([yAxisDomain.max, yAxisDomain.min])
        .range([0, barAreaHeight]);

    const xAxisScale = d3.scaleBand()
        .domain(barGroupKeys)
        .range([0, barAreaWidth])
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

    // TODO: Document this better
    const yTicks = getSmartTicks(yAxisDomain.max - yAxisDomain.min);
    const yAxis = d3.axisLeft(yAxisScale).ticks(yTicks);

    return {
        xAxis,
        yAxis,
        xAxisScale,
        yAxisScale,
        xAxisSubgroupKVS,
        containerHeight: payload.containerHeight,
        containerWidth: payload.containerWidth,
        barAreaHeight,
        barAreaWidth,
        chartMargin: config.margin
    };

}
