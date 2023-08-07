import { BarChartScales, BarGroup } from "../models";
import { defaultBarChartConfig } from "../constants";
import { CardinalYAxis, CategoricalXAxis, ContainerSize } from "../../shared/models";
import { KVS } from "entity-store";
import { Many } from "data-modeling";
import { createCategorizedValuesChartScales } from "../../shared/functions/create-categorized-values-chart-scales.function";

export function createBarChartScales(payload: {
    readonly barGroups: ReadonlyArray<BarGroup>;
} & ContainerSize & CategoricalXAxis & CardinalYAxis, config = defaultBarChartConfig): BarChartScales {

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
