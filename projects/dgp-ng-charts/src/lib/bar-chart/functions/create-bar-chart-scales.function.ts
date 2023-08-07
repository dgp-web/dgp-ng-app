import * as _ from "lodash";
import { BarChartScales, BarGroup } from "../models";
import { defaultBarChartConfig } from "../constants";
import { createCardinalYAxis, createCategoricalXAxis, createCategoricalXAxisScale, createYAxisScale } from "../../shared/functions";
import { notNullOrUndefined } from "dgp-ng-app";
import { CardinalYAxis, CategoricalXAxis, ContainerSize } from "../../shared/models";
import { KVS } from "entity-store";
import { Many } from "data-modeling";
import { tryResolveMarginLeft } from "../../box-plot/functions";

// TODO: Homogenize with createBoxPlotScales
export function createBarChartScales(payload: {
    readonly barGroups: ReadonlyArray<BarGroup>;
} & ContainerSize & CategoricalXAxis & CardinalYAxis, config = defaultBarChartConfig): BarChartScales {

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

    const createXAxisScaleResult = createCategoricalXAxisScale({
        dataAreaWidth,
        categories: payload.barGroups.map(x => x.barGroupKey),
        subCategoryKVS: payload.barGroups.reduce((result, boxGroup) => {
            result[boxGroup.barGroupKey] = boxGroup.bars.map(x => x.barKey);
            return result;
        }, {} as KVS<Many<string>>)
    });

    const xAxisScale = createXAxisScaleResult.xAxisScale;
    const xAxisSubgroupKVS = createXAxisScaleResult.xAxisSubgroupKVS;

    const xAxis = createCategoricalXAxis({
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
