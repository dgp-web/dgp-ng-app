import { BarChartScales, BarGroup } from "../models";
import { defaultBarChartConfig } from "../constants";
import { Many } from "data-modeling";
import { createCategorizedValuesChartScales } from "../../shared/functions/create-categorized-values-chart-scales.function";
import { CategorizedValuesChartScalesSharedParams } from "../../shared/models/categorized-values-chart-scales-shared-params.model";
import { toBarChartValuesForExtremumComputation } from "./to-bar-chart-values-for-extremum-computation.function";
import { toBarChartSubCategoryKVS } from "./to-bar-chart-sub-category-kvs.function";

export interface BarChartScalesParams extends CategorizedValuesChartScalesSharedParams {
    readonly barGroups: Many<BarGroup>;
}

export function createBarChartScales(
    payload: BarChartScalesParams,
    config = defaultBarChartConfig
): BarChartScales {

    const valuesForExtremumComputation = payload.barGroups.reduce(toBarChartValuesForExtremumComputation, []);

    const categories = payload.barGroups.map(x => x.barGroupKey);
    const subCategoryKVS = payload.barGroups.reduce(toBarChartSubCategoryKVS, {});

    return createCategorizedValuesChartScales({
        ...payload,
        valuesForExtremumComputation,
        categories,
        subCategoryKVS
    }, config);
}
