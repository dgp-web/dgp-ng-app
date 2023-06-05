import { reverseTComputation } from "../reverse-t-computation.function";

describe("reverseTComputation", () => {

    it(`should return the value associated with ratio on the distance between min and max`, () => {
        const min = 10;
        const max = 100;

        const value = 0.17;

        const result = reverseTComputation({
            value, min, max
        });

        const expectedResult = value * (max - min);
        expect(result).toEqual(expectedResult);
    });

});
