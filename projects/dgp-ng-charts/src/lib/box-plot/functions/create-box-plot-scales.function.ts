import { BoxGroup, BoxPlotControlLine, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";
import * as _ from "lodash";
import { createCardinalYAxis, createCategoricalXAxis, createCategoricalXAxisScale, createYAxisScale } from "../../shared/functions";
import { notNullOrUndefined } from "dgp-ng-app";
import { CardinalYAxis, CategoricalXAxis, ContainerSize, ScaleType } from "../../shared/models";
import { Many } from "data-modeling";
import { KVS } from "entity-store";

export function createBoxPlotScales(payload: {
    readonly boxGroups: ReadonlyArray<BoxGroup>;
    readonly controlLines?: ReadonlyArray<BoxPlotControlLine>;
} & ContainerSize & CategoricalXAxis & CardinalYAxis, config = defaultBoxPlotConfig): BoxPlotScales {

    const boxGroupKeys = payload.boxGroups.map(x => x.boxGroupId);
    const boxIds = _.flatten(payload.boxGroups.map(x => x.boxes.map(y => y.boxId)));

    const valuesForExtremumComputation = payload.boxGroups.reduce((previousValue, currentValue) => {

        currentValue.boxes.forEach(box => {
            box.outliers?.forEach(outlier => previousValue.push(outlier));
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

    const createXAxisScaleResult = createCategoricalXAxisScale({
        dataAreaWidth,
        categories: payload.boxGroups.map(x => x.boxGroupId),
        subCategoryKVS: payload.boxGroups.reduce((result, boxGroup) => {
            result[boxGroup.boxGroupId] = boxGroup.boxes.map(x => x.boxId);
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


