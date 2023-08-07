import { KVS } from "entity-store";
import { Many } from "data-modeling";
import { BoxGroup } from "../models";

export const toBoxPlotSubCategoryKVS = (result: KVS<Many<string>>, item: BoxGroup) => {
    result[item.boxGroupId] = item.boxes.map(x => x.boxId);
    return result;
};
