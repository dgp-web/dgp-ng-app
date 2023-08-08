import { niceRoundPseudoCategoricalNumberTicks } from "../nice-round-pseudo-number-ticks.function";
import { createCategoricalXAxis } from "../create-categorical-x-axis.function";
import { CategoricalXAxis, ScaleType } from "../../models";
import { createCategoricalXAxisScale } from "../create-categorical-x-axis-scale.function";

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

        const xAxisModel: CategoricalXAxis = {xAxisScaleType: ScaleType.Categorical};

        const {xAxisScale} = createCategoricalXAxisScale({
            categories: input,
            dataAreaWidth: containerWidth
        });

        const xAxis = createCategoricalXAxis({
            xAxisModel,
            xAxisScale,
            containerWidth
        });

        const output = input
            .map(x => x.replace("x", ""))
            .map(x => {

                if (x.length <= 4) return x;

                const parsedNumber = +x;
                if (parsedNumber > 10) return x;

                const elements = x.split(".");
                const decimalPlaces = elements[1];
                // TODO: find three consecutive numbers

                const trimmedDecimalPlaces = roundDecimalPlaces(decimalPlaces);


                return elements[0] + "." + trimmedDecimalPlaces;

            })
            .map(x => x + "x");

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

export function roundDecimalPlaces(decimalPlaces: string): string {

    let result = "";
    let count = 0;

    for (let i = 0; i < decimalPlaces.length; i++) {
        const char = decimalPlaces[i];
        if (result === "") {
            result += char;
        } else {

            if (char === "0" && result.split("").every(x => x === "0")) {
                result += char;
            } else {

                if (char === result[result.length - 1]) {

                    if (count === 2) {
                        // take last item from string, and round it // 333 to 33 and 666 to 67
                        const lastItemButOne = result[result.length - 2];
                        result = result.split("")
                            .filter((x, i1) => i1 < result.length - 2)
                            .join("");
                        if (+char >= 5) {
                            result += (+lastItemButOne + 1).toString();
                        } else {
                            result += lastItemButOne.toString();
                        }
                        break;
                    } else {
                        result += char;
                        count++;
                    }

                } else {
                    result += char;
                    count = 1;
                }

            }

        }
    }

    return result;

}
