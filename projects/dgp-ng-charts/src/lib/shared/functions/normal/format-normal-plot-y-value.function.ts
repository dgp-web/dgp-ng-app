import { Many } from "data-modeling";
import * as d3 from "d3";

export function formatNormalPlotYValue(payload: {
    readonly yAxisTickValues: Many<number>;
}) {
    const yAxisTickValues = payload.yAxisTickValues;

    return (x: number) => {
        if (x >= 1 && x <= 99) return d3.format("d")(x);
        if (x < 1) {

            return x.toPrecision(1);
        }
        if (x > 99) {


            let refIndex = yAxisTickValues.length - 1;
            let revValue = yAxisTickValues[refIndex];
            let nextValue = yAxisTickValues[refIndex - 1];
            while (
                nextValue > x
                && refIndex < yAxisTickValues.length
                ) {
                refIndex--;
                revValue = yAxisTickValues[refIndex];
                nextValue = yAxisTickValues[refIndex - 1];
            }


            const numberOfDecimalPlaces = revValue.toString().split(".")[1]?.length || 1;
            return x.toFixed(numberOfDecimalPlaces);

        }
    };
}
