import { BarGroup } from "../models";

export const toBarChartValuesForExtremumComputation = (result: Array<number>, item: BarGroup) => {

    item.bars.forEach(bar => {
        result.push(bar.value);
    });

    return result;
};
