import { BoxGroup, BoxPlotControlLine, BoxPlotScales } from "../models";
import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";
import { Many } from "data-modeling";
import { KVS } from "entity-store";
import { createCategorizedValuesChartScales } from "../../shared/functions/create-categorized-values-chart-scales.function";
import { CategorizedValuesChartScalesParams } from "../../shared/models/categorized-values-chart-scales-params.model";

export interface BoxPlotScalesParams extends CategorizedValuesChartScalesParams {
    readonly boxGroups: ReadonlyArray<BoxGroup>;
    readonly controlLines?: ReadonlyArray<BoxPlotControlLine>;
}

export function createBoxPlotScales(
    payload: BoxPlotScalesParams,
    config = defaultBoxPlotConfig
): BoxPlotScales {

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

    const categories = payload.boxGroups.map(x => x.boxGroupId);
    const subCategoryKVS = payload.boxGroups.reduce((result, boxGroup) => {
        result[boxGroup.boxGroupId] = boxGroup.boxes.map(x => x.boxId);
        return result;
    }, {} as KVS<Many<string>>);

    return createCategorizedValuesChartScales({
        ...payload,
        valuesForExtremumComputation,
        categories,
        subCategoryKVS
    }, config);
}


