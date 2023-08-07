import { KVS } from "entity-store";
import { Many } from "data-modeling";
import { BarGroup } from "../models";

export const toBarChartSubCategoryKVS = (result: KVS<Many<string>>, item: BarGroup) => {
    result[item.barGroupKey] = item.bars.map(x => x.barKey);
    return result;
};
