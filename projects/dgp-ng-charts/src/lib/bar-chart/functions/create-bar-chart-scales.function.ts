import { BarChartScales, BarGroup } from "../models";
import { defaultBarChartConfig } from "../constants";
import { KVS } from "entity-store";
import { Many } from "data-modeling";
import { createCategorizedValuesChartScales } from "../../shared/functions/create-categorized-values-chart-scales.function";
import { CategorizedValuesChartScalesParams } from "../../shared/models/categorized-values-chart-scales-params.model";

export interface BarChartScalesParams extends CategorizedValuesChartScalesParams {
    readonly barGroups: Many<BarGroup>;
}

export function createBarChartScales(
    payload: BarChartScalesParams,
    config = defaultBarChartConfig
): BarChartScales {

    const valuesForExtremumComputation = payload.barGroups.reduce((previousValue, currentValue) => {

        currentValue.bars.forEach(bar => {
            previousValue.push(bar.value);
        });

        return previousValue;
    }, new Array<number>());
    const categories = payload.barGroups.map(x => x.barGroupKey);
    const subCategoryKVS = payload.barGroups.reduce((result, boxGroup) => {
        result[boxGroup.barGroupKey] = boxGroup.bars.map(x => x.barKey);
        return result;
    }, {} as KVS<Many<string>>);

    return createCategorizedValuesChartScales({
        ...payload,
        valuesForExtremumComputation,
        categories,
        subCategoryKVS
    }, config);
}
