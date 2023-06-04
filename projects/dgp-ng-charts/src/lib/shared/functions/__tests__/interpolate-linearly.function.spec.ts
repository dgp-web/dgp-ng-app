import { interpolateLinearly } from "../interpolate-linearly.function";

describe(interpolateLinearly.name, () => {

    it(`should return the share of value on the distance between min and max`, () => {
        const min = 10;
        const max = 100;

        const value = 17;

        const result = interpolateLinearly({min, max, value});

        const expectedResult = (17 - min) / (max - min);
        expect(result).toEqual(expectedResult);
    });

});
