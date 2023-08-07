import { BoxGroup, BoxPlotControlLine, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";
import { Many } from "data-modeling";
import { createCategorizedValuesChartScales } from "../../shared/functions/create-categorized-values-chart-scales.function";
import { CategorizedValuesChartScalesSharedParams } from "../../shared/models/categorized-values-chart-scales-shared-params.model";
import { toBoxPlotValuesForExtremumComputation } from "./to-box-plot-values-for-extremum-computation.function";
import { toBoxPlotSubCategoryKVS } from "./to-box-plot-sub-category-kvs.function";

export interface BoxPlotScalesParams extends CategorizedValuesChartScalesSharedParams {
    readonly boxGroups: Many<BoxGroup>;
    readonly controlLines?: Many<BoxPlotControlLine>;
}

export function createBoxPlotScales(
    payload: BoxPlotScalesParams,
    config = defaultBoxPlotConfig
): BoxPlotScales {

    const valuesForExtremumComputation = payload.boxGroups.reduce(toBoxPlotValuesForExtremumComputation, []);

    const categories = payload.boxGroups.map(x => x.boxGroupId);
    const subCategoryKVS = payload.boxGroups.reduce(toBoxPlotSubCategoryKVS, {});

    return createCategorizedValuesChartScales({
        ...payload,
        valuesForExtremumComputation,
        categories,
        subCategoryKVS
    }, config);
}


