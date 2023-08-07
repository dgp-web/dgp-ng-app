import { BoxGroup } from "../models";

export const toBoxPlotValuesForExtremumComputation = (result: Array<number>, item: BoxGroup) => {

    item.boxes.forEach(box => {
        box.outliers?.forEach(outlier => result.push(outlier));
        const quantiles = [
            box.quantiles.max,
            box.quantiles.upper,
            box.quantiles.median,
            box.quantiles.lower,
            box.quantiles.min,
        ];
        quantiles.forEach(quantile => result.push(quantile));
    });

    return result;
};
