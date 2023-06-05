import { createNormalInterpolatorWithBoundaries } from "../create-normal-interpolator-with-boundaries.function";
import { computeT } from "../../compute-t.function";

describe("createNormalInterpolatorWithBoundaries", () => {

    describe(`without passed P and a range between 0 and 400 px`, () => {

        const pMin = 91;
        const pMax = 99;

        const createInterpolator = createNormalInterpolatorWithBoundaries({
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

});
