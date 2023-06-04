import { createNormalInterpolator } from "../create-normal-interpolator.function";
import { defaultProbabilityChartPMax, defaultProbabilityChartPMin } from "../../../constants";

describe("createNormalInterpolator", () => {

    describe(`without passed P and a range between 0 and 400 px`, () => {

        const createInterpolator = createNormalInterpolator();

        const a = 0;
        const b = 400;

        const interpolate = createInterpolator(a, b);

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

        it(`should return (b-a)/2 for p = 0.5`, () => {
            const p = 0.5;
            const result = interpolate(p);
            const expectedResult = (b - a) / 2;
            expect(result).toEqual(expectedResult);
        });

    });

    describe(`with passed P for n = 11 from 0 to 1 in steps of 0.1 and a range between 0 and 400 px`, () => {

        const P = [0.005, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.995];

        const createInterpolator = createNormalInterpolator({P});

        const a = 0;
        const b = 400;

        const interpolate = createInterpolator(a, b);

        it(`should return b for the minimum value in P`, () => {
            const pMin = Math.min(...P);
            const result = interpolate(pMin);
            const expectedResult = b;
            expect(result).toEqual(expectedResult);
        });

        it(`should return a for the maximum value in P`, () => {
            const pMin = Math.max(...P);
            const result = interpolate(pMin);
            const expectedResult = a;
            expect(result).toEqual(expectedResult);
        });

        it(`should return (b-a)/2 for p = 0.5`, () => {
            const p = 0.5;
            const result = interpolate(p);
            const expectedResult = (b - a) / 2;
            expect(result).toEqual(expectedResult);
        });

    });

});
