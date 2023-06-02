import { createNormalInterpolator } from "../create-normal-interpolator.function";
import { defaultNormalParameters, defaultProbabilityChartPMin } from "../../../constants";

describe(createNormalInterpolator.name, () => {

    describe(`without passed P and a range between 0 and 400 px`, () => {

        const createInterpolator = createNormalInterpolator();

        const a = 0;
        const b = 400;

        const interpolate = createInterpolator(a, b);

        const normalParameters = defaultNormalParameters;

        it(`should return b for the default pMin`, () => {
            const pMin = defaultProbabilityChartPMin;
            const result = interpolate(pMin);
            const expectedResult = b;
            expect(result).toEqual(expectedResult);
        });

    });

});
