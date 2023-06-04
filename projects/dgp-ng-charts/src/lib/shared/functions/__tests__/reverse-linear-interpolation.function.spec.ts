import { reverseLinearInterpolation } from "../reverse-linear-interpolation.function";

describe(reverseLinearInterpolation.name, () => {

    it(`should return the value associated with ratio on the distance between min and max`, () => {
        const min = 10;
        const max = 100;

        const value = 0.17;

        const result = reverseLinearInterpolation({
            value, min, max
        });

        const expectedResult = value * (max - min);
        expect(result).toEqual(expectedResult);
    });

});
