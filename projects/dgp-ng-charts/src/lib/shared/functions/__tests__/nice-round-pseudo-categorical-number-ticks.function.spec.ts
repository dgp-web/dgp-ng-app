import { niceRoundPseudoCategoricalNumberTicks } from "../nice-round-pseudo-number-ticks.function";
import { createCategoricalXAxis } from "../create-categorical-x-axis.function";
import { CategoricalXAxis, ScaleType } from "../../models";
import { createCategoricalXAxisScale } from "../create-categorical-x-axis-scale.function";
import { CardinalAxisTickFormat } from "../../models/cardinal-axis-tick-format.model";
import { roundDecimalPlaces } from "../round-decimal-places.function";

export const formatCustomTick: CardinalAxisTickFormat = (x: string) => {

    const lastChar = x[x.length - 1];

    x = x.replace(lastChar, "");

    const elements = x.split(".");
    const integer = elements[0];
    const decimalPlaces = elements[1];

    if (!decimalPlaces || decimalPlaces.length <= 2) return x + lastChar;

    if (+integer >= 10) {
        let result = Number.parseFloat(x).toFixed(2);

        if (result.endsWith(".00")) result = result.replace(".00", "");

        return result + lastChar;
    }

    const trimmedDecimalPlaces = roundDecimalPlaces(decimalPlaces);
    return integer + "." + trimmedDecimalPlaces + lastChar;

};

xdescribe("niceRoundPseudoCategoricalNumberTicks", () => {

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
            "2x",
            "3.046666666666667x",
            "1848.0002777777777777777777777778x"
        ];

        const containerWidth = 1000;

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
            "2x",
            "3.047x",
            "1848x"
        ];

        expect(output).toEqual(expectedOutput);

    });

});
