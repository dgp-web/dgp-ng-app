import { Many } from "data-modeling";
import { ItemConfiguration } from "../../types";

import { AbsoluteSizes } from "../../model/grid/absolute-sizes.model";

/**
 * Calculates the absolute sizes of all the children of this Item.
 */
export function calculateAbsoluteSizes(payload: {
    readonly itemConfigs: Many<ItemConfiguration>;
    readonly element: JQuery;
    readonly isColumn: boolean;
    readonly splitterSize: number;
}): AbsoluteSizes {
    const itemConfigs = payload.itemConfigs;
    const element = payload.element;
    const isColumn = payload.isColumn;
    const splitterSize = payload.splitterSize;

    let i: number,
        totalSplitterSize = (itemConfigs.length - 1) * splitterSize,
        totalWidth = element.width(),
        totalHeight = element.height(),
        totalAssigned = 0,
        additionalPixel: number,
        itemSize: number,
        itemSizes = new Array<number>();

    if (isColumn) {
        totalHeight -= totalSplitterSize;
    } else {
        totalWidth -= totalSplitterSize; 
    }

    for (i = 0; i < itemConfigs.length; i++) {
        if (isColumn) {
            itemSize = Math.floor(totalHeight * (itemConfigs[i].height / 100));
        } else {
            itemSize = Math.floor(totalWidth * (itemConfigs[i].width / 100));
        }

        totalAssigned += itemSize;
        itemSizes.push(itemSize);
    }

    additionalPixel = Math.floor((isColumn ? totalHeight : totalWidth) - totalAssigned);

    return {
        itemSizes,
        additionalPixel,
        totalWidth,
        totalHeight
    };
}
