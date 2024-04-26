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

            /**
             * This replaces issues like 99.999000001
             */
            const trimmedNumber = +x.toString().replace(/(0+1+)+/, "");
            /**
             * If x is a tick value, don't use special handling
             */
            if (yAxisTickValues.includes(trimmedNumber)) return trimmedNumber.toString();

            let refIndex = yAxisTickValues.length - 1;
            let revValue = yAxisTickValues[refIndex];
            let smallestDistance = Math.abs(trimmedNumber - revValue);
            while (
                revValue > trimmedNumber
                && Math.abs(trimmedNumber - yAxisTickValues[refIndex - 1]) < smallestDistance
                && refIndex < yAxisTickValues.length
                ) {
                refIndex--;
                revValue = yAxisTickValues[refIndex];
                smallestDistance = Math.abs(trimmedNumber - revValue);
            }

            if (trimmedNumber > revValue) {
                revValue = yAxisTickValues[refIndex + 1];
            }

            const numberOfDecimalPlaces = revValue.toString().split(".")[1]?.length || 1;
            return trimmedNumber.toFixed(numberOfDecimalPlaces);

        }
    };
}
