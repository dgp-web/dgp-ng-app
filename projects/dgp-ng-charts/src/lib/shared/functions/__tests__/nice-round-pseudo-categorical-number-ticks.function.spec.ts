import { niceRoundPseudoCategoricalNumberTicks } from "../nice-round-pseudo-number-ticks.function";
import { createCategoricalXAxis } from "../create-categorical-x-axis.function";
import { CategoricalXAxis, ScaleType } from "../../models";
import { createCategoricalXAxisScale } from "../create-categorical-x-axis-scale.function";
import { CardinalAxisTickFormat } from "../../models/cardinal-axis-tick-format.model";

describe("niceRoundPseudoCategoricalNumberTicks", () => {

    it(`should round numerical components in formats`, () => {

        /**
         * - short entries such as 0, 0.05, 1, and 2 should remain as they are
         * - missing roundings should be detected if more than three consecutive decimal places are the same
         */
        const input = [
            "0x",
            "0.002777777777777778x",
            "0.008333333333333333x",
            "0.016666666666666666x",
            "0.05x",
            "0.16666666666666666x",
            "0.3333333333333333x",
            "0.6666666666666666x",
            "1x",
            "1.3333333333333333x",
            "1.6666666666666667x",
            "2x"
        ];

        const containerWidth = 800;

        const xAxisModel: CategoricalXAxis = {
            xAxisScaleType: ScaleType.Categorical,
            xAxisTickFormat: formatCustomTick
        };

        const {xAxisScale} = createCategoricalXAxisScale({
            categories: input,
            dataAreaWidth: containerWidth
        });

        const xAxis = createCategoricalXAxis({
            xAxisModel,
            xAxisScale,
            containerWidth
        });

        const output = xAxis.tickValues();

        const expectedOutput = [
            "0x",
            "0.0028x",
            "0.0083x",
            "0.017x",
            "0.05x",
            "0.17x",
            "0.33x",
            "0.67x",
            "1x",
            "1.33x",
            "1.67x",
            "2x"
        ];

        expect(output).toEqual(expectedOutput);

    });

});

export const formatCustomTick: CardinalAxisTickFormat = (x: string) => {

    const lastChar = x[x.length - 1];

    x = x.replace(lastChar, "");

    const elements = x.split(".");
    const decimalPlaces = elements[1];

    if (!decimalPlaces) return x + lastChar;

    const trimmedDecimalPlaces = roundDecimalPlaces(decimalPlaces);
    return elements[0] + "." + trimmedDecimalPlaces + lastChar;

};

export function canKeepLeadingZero(payload: {
    readonly decimalPlace: string;
    readonly result: string;
}): boolean {
    const decimalPlace = payload.decimalPlace;
    const result = payload.result;

    return decimalPlace === "0" && result.split("").every(x => x === "0");
}

export function roundDecimalPlaces(decimalPlaces: string, config = {
    sequenceLength: 2
}): string {

    const sequenceLength = config.sequenceLength;
    let result = "";

    let count = 0;

    for (const decimalPlace of decimalPlaces) {

        if (result === "" || canKeepLeadingZero({decimalPlace, result})) {
            result += decimalPlace;
            continue;
        }

        if (decimalPlace !== result[result.length - 1]) {
            result += decimalPlace;
            count = 1;
            continue;
        }

        if (count !== sequenceLength) {
            result += decimalPlace;
            count++;
            continue;
        }

        // take start item of sequence from string, and round it // 333 to 33 and 666 to 67
        let lastItemButOne = +result[result.length - sequenceLength];
        result = result.split("")
            .filter((x, i1) => i1 < result.length - sequenceLength)
            .join("");
        if (+decimalPlace >= 5) lastItemButOne++;
        result += lastItemButOne.toString();
        break;
    }

    return result;
}


