import { niceRoundPseudoCategoricalNumberTicks } from "../nice-round-pseudo-number-ticks.function";
import { createCategoricalXAxis } from "../create-categorical-x-axis.function";
import { CategoricalXAxis, ScaleType } from "../../models";
import { createCategoricalXAxisScale } from "../create-categorical-x-axis-scale.function";

describe("niceRoundPseudoCategoricalNumberTicks", () => {

    it(`should round numerical components in formats`, () => {

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

                if (x.length <= 3) return x;

                const parsedNumber = +x;
                if (parsedNumber > 0) return x;

                const fractionDigits = x.split(".")[1];
                const trimmedFractionDigits = fractionDigits; // TODO: Remove leading zeros, then apply

                if (fractionDigits.length > 3) return parsedNumber.toPrecision(3);

                return parsedNumber.toPrecision(3);

            })
            .map(x => x + "x");

        console.log(xAxis.tickValues());
        console.log(output);

        /* const result = niceRoundPseudoCategoricalNumberTicks({
             xAxis
         });*/

        const expectedOutput = [
            "0x",
            "0.00278x",
            "0.00833x",
            "0.017x",
            "0.05x",
            "0.167x",
            "0.333x",
            "0.667x",
            "1x",
            "1.33x",
            "1.67x",
            "2x"
        ];

    });

});
