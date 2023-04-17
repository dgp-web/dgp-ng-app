import { Many } from "data-modeling";
import { ItemConfiguration } from "../../types";
import { calculateAbsoluteSizes } from "./calculate-absolute-sizes.function";
import { Wide } from "../../models/grid/wide.model";
import { AbsoluteSizes } from "../../model/grid/absolute-sizes.model";

export function respectMinItemWidth(payload: {
    readonly itemConfigs: Many<ItemConfiguration>;
    readonly element: JQuery;
    readonly isColumn: boolean;
    readonly splitterSize: number;
    readonly minItemWidth?: number;
}): Many<ItemConfiguration> {
    const itemConfigs = payload.itemConfigs;
    const isColumn = payload.isColumn;
    const element = payload.element;
    const splitterSize = payload.splitterSize;
    const minItemWidth = payload.minItemWidth || 0;

    let sizeData: AbsoluteSizes = null;
    const entriesOverMin: Array<Wide> = [];
    let totalOverMin = 0;
    let totalUnderMin = 0;
    let remainingWidth = 0;
    let itemSize = 0;
    let reducePercent: number;
    let reducedWidth: number;
    const allEntries: Array<Wide> = [];
    let entry: Wide;

    if (isColumn || !minItemWidth || itemConfigs.length <= 1) return itemConfigs;

    sizeData = calculateAbsoluteSizes({itemConfigs, isColumn, element, splitterSize});

    /**
     * Figure out how much we are under the min item size total and how much room we have to use.
     */
    for (let i = 0; i < itemConfigs.length; i++) {
        itemSize = sizeData.itemSizes[i];

        if (itemSize < minItemWidth) {
            totalUnderMin += minItemWidth - itemSize;
            entry = {width: minItemWidth};
        } else {
            totalOverMin += itemSize - minItemWidth;
            entry = {width: itemSize};
            entriesOverMin.push(entry);
        }

        allEntries.push(entry);
    }

    /**
     * If there is nothing under min, or there is not enough over to make up the difference, do nothing.
     */
    if (totalUnderMin === 0 || totalUnderMin > totalOverMin) return itemConfigs;

    /**
     * Evenly reduce all columns that are over the min item width to make up the difference.
     */
    reducePercent = totalUnderMin / totalOverMin;
    remainingWidth = totalUnderMin;
    for (let i = 0; i < entriesOverMin.length; i++) {
        entry = entriesOverMin[i];
        reducedWidth = Math.round((entry.width - minItemWidth) * reducePercent);
        remainingWidth -= reducedWidth;
        entry.width -= reducedWidth;
    }

    /**
     * Take anything remaining from the last item.
     */
    if (remainingWidth !== 0) {
        allEntries[allEntries.length - 1].width -= remainingWidth;
    }

    /**
     * Set every item's size relative to 100 relative to its size to total
     */
    return itemConfigs.map((item, index) => {
        const width = (allEntries[index].width / sizeData.totalWidth) * 100;
        return {...item, width};
    });
}
