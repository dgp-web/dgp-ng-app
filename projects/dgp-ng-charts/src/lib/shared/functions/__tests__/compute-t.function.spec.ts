import { computeT } from "../compute-t.function";

describe("computeT", () => {

    it(`should return the share of value on the distance between min and max`, () => {
        const min = 10;
        const max = 100;

        const value = 17;

        const result = computeT({min, max, value});

        const expectedResult = (17 - min) / (max - min);
        expect(result).toEqual(expectedResult);
    });

});
