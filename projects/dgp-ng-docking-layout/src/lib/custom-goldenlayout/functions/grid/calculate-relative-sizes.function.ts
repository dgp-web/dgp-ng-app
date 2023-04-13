import { Many } from "data-modeling";
import { ItemConfiguration } from "../../types";
import { respectMinItemWidth } from "./respect-min-item-width.function";

/**
 * Calculates the relative sizes of all children of this Item. The logic
 * is as follows:
 *
 * - Add up the total size of all items that have a configured size
 *
 * - If the total == 100 (check for floating point errors)
 *        Excellent, job done
 *
 * - If the total is > 100,
 *        set the size of items without set dimensions to 1/3 and add this to the total
 *        set the size off all items so that the total is hundred relative to their original size
 *
 * - If the total is < 100
 *        If there are items without set dimensions, distribute the remainder to 100 evenly between them
 *        If there are no items without set dimensions, increase all items sizes relative to
 *        their original size so that they add up to 100
 */
export function calculateRelativeSizes(payload: {
    readonly itemConfigs: Many<ItemConfiguration>;
    readonly element: JQuery;
    readonly isColumn: boolean;
    readonly splitterSize: number;
    readonly minItemWidth?: number;
}): Many<ItemConfiguration> {
    let itemConfigs = payload.itemConfigs;
    const isColumn = payload.isColumn;
    const element = payload.element;
    const splitterSize = payload.splitterSize;
    const minItemWidth = payload.minItemWidth;

    let total = 0;
    const itemsWithoutSetDimension = new Array<ItemConfiguration>(),
        dimension = isColumn ? "height" : "width";

    itemConfigs.forEach(x => {
        if (x[dimension]) {
            total += x[dimension];
        } else {
            itemsWithoutSetDimension.push(x);
        }
    });

    const roundedTotal = Math.round(total);

    /**
     * Everything adds up to hundred, all good :-)
     */
    if (roundedTotal === 100) {
        return respectMinItemWidth({itemConfigs, isColumn, splitterSize, element, minItemWidth});

        /**
         * Allocate the remaining size to the items without a set dimension
         */
    } else if (roundedTotal < 100 && itemsWithoutSetDimension.length > 0) {
        const itemsWithoutSetDimensionLength = itemsWithoutSetDimension.length;
        itemsWithoutSetDimension.forEach(x => {
            x[dimension] = (100 - total) / itemsWithoutSetDimensionLength;
        });
        return respectMinItemWidth({itemConfigs, isColumn, splitterSize, element, minItemWidth});

        /**
         * If the total is > 100, but there are also items without a set dimension left, assing 50
         * as their dimension and add it to the total
         *
         * This will be reset in the next step
         */
    } else if (roundedTotal > 100) {
        itemsWithoutSetDimension.forEach(x => {
            x[dimension] = 50;
            total += 50;
        });
    }

    /**
     * Set every item's size relative to 100 relative to its size to total
     */

    itemConfigs = itemConfigs.map(x => {
        return {
            ...x,
            [dimension]: (x[dimension] / total) * 100
        };
    });

    return respectMinItemWidth({itemConfigs, isColumn, splitterSize, element, minItemWidth});
}
