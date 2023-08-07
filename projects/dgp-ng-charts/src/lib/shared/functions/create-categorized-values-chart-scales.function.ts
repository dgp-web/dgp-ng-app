import { Many } from "data-modeling";
import { KVS } from "entity-store";
import { CardinalYAxis, CategoricalXAxis, ContainerSize, SharedChartConfig } from "../models";
import { CategorizedValuesChartScales } from "../models/categorized-values-chart-scales.model";
import * as _ from "lodash";
import { notNullOrUndefined } from "dgp-ng-app";
import { createYAxisScale } from "./create-cardinal-y-axis-scale.function";
import { createCategoricalXAxisScale } from "./create-categorical-x-axis-scale.function";
import { createCategoricalXAxis } from "./create-categorical-x-axis.function";
import { createCardinalYAxis } from "./create-cardinal-y-axis.function";
import { tryResolveMarginLeft } from "./try-resolve-margin-left.function";

export function createCategorizedValuesChartScales(payload: {
    readonly categories: Many<string>;
    readonly subCategoryKVS: KVS<Many<string>>;
    readonly valuesForExtremumComputation: Many<number>;
} & ContainerSize & CategoricalXAxis & CardinalYAxis, config: SharedChartConfig & {
    /**
     * Normalized share with which the extreme values
     * are offset from the borders of the drawing area.
     *
     * If this is 0, then the extreme values are
     * drawn directly onto the borders
     *
     * default: 0.05
     */
    readonly cardinalScaleOffset: number;
    /**
     * Reference length of a character
     *
     * default: 10
     */
    readonly refTickCharWidth: number;
}): CategorizedValuesChartScales {

    const categories = payload.categories;
    const subCategoryKVS = payload.subCategoryKVS;
    const valuesForExtremumComputation = payload.valuesForExtremumComputation;

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
        categories,
        subCategoryKVS
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
