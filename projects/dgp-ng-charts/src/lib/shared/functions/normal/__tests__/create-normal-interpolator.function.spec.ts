import { createNormalInterpolator } from "../create-normal-interpolator.function";
import { defaultNormalParameters, defaultProbabilityChartPMax, defaultProbabilityChartPMin } from "../../../constants";

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

        it(`should return a for the default pMax`, () => {
            const pMax = defaultProbabilityChartPMax;
            const result = interpolate(pMax);
            const expectedResult = a;
            expect(result).toEqual(expectedResult);
        });

        it(`should return Math.abs(a-b)/2 for p = 0.5`, () => {
            const p = 0.5;
            const result = interpolate(p);
            const expectedResult = Math.abs(a - b) / 2;
            expect(result).toEqual(expectedResult);
        });

    });

});
