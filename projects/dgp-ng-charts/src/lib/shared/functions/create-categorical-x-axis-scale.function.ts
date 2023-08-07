import { Many } from "data-modeling";
import { KVS } from "entity-store";
import * as d3 from "d3";

export function createCategoricalXAxisScale(payload: {
    readonly categories: Many<string>;
    /**
     * Indexed by category
     */
    readonly subCategoryKVS?: KVS<Many<string>>;
    readonly dataAreaWidth: number;
}): {
    readonly xAxisScale: d3.ScaleBand<string>;
    readonly xAxisSubgroupKVS?: KVS<d3.ScaleBand<string>>;
} {
    const categories = payload.categories;
    const subCategoryKVS = payload.subCategoryKVS;
    const dataAreaWidth = payload.dataAreaWidth;

    const xAxisScale = d3.scaleBand()
        .domain(categories)
        .range([0, dataAreaWidth])
        .padding(0.2);

    const xAxisSubgroupKVS = Object.keys(subCategoryKVS).reduce((previousValue, category) => {
        const subCategories = subCategoryKVS[category];

        previousValue[category] = d3.scaleBand()
            .domain(subCategories)
            .range([0, xAxisScale.bandwidth()])
            .padding(0.05);

        return previousValue;

    }, {});

    return {xAxisScale, xAxisSubgroupKVS};
}
