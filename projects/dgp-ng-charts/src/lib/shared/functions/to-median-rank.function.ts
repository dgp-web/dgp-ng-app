import { Many } from "data-modeling";
import { getMedianRank } from "./normal";

export const toMedianRank = (x: any, index: number, collection: Many<any>) => {
    return getMedianRank({
        i: index + 1,
        n: collection.length
    });
};
