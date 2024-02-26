import { createNormalInterpolatorWithBoundariesFactory } from "../create-normal-interpolator-with-boundaries-factory.function";
import { computeT } from "../../compute-t.function";
import { createNormalInterpolatorFactory } from "../create-normal-interpolator-factory.function";

describe("createNormalInterpolatorWithBoundariesFactory", () => {

    describe(`without passed P and a range between 0 and 400 px`, () => {

        const pMin = 91;
        const pMax = 99;

        const createInterpolator = createNormalInterpolatorWithBoundariesFactory({
            pMin, pMax
        });

        const a = 0;
        const b = 400;

        const interpolate = createInterpolator(a, b);


        it(`should return b for pMin`, () => {
            const tPMin = computeT({
                min: pMin,
                max: pMax,
                value: pMin
            });
            const result = interpolate(tPMin);
            const expectedResult = b;
            expect(result).toEqual(expectedResult);
        });

        it(`should return a for pMax`, () => {
            const tPMax = computeT({
                min: pMin,
                max: pMax,
                value: pMax
            });
            const result = interpolate(tPMax);
            const expectedResult = a;
            expect(result).toEqual(expectedResult);
        });


    });

    describe(`without passed P and a range between 0 and 400 px`, () => {

        const createInterpolator = createNormalInterpolatorWithBoundariesFactory({});

        const a = 0;
        const b = 400;

        const interpolate = createInterpolator(a, b);

        it(`should return b for tMin=0`, () => {
            const tMin = 0;
            const result = interpolate(tMin);
            const expectedResult = b;
            expect(result).toEqual(expectedResult);
        });

        it(`should return a for the default tMax=1`, () => {
            const pMax = 1;
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

        const createInterpolator = createNormalInterpolatorWithBoundariesFactory({P});

        const a = 0;
        const b = 400;

        const interpolate = createInterpolator(a, b);

        it(`should return b for tMin=0`, () => {
            const tMin = 0;
            const result = interpolate(tMin);
            const expectedResult = b;
            expect(result).toEqual(expectedResult);
        });

        it(`should return a for tMax=1`, () => {
            const tMax = 1;
            const result = interpolate(tMax);
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
