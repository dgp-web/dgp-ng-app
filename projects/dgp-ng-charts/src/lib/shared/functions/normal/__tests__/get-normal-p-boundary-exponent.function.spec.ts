import { getNormalPBoundaryExponent } from "../get-normal-p-boundary-exponent.function";

describe("getNormalPBoundaryExponent", () => {

    it(`should return 4 for a value of 121`, () => {
        const result = getNormalPBoundaryExponent({
            PLength: 121
        });
        expect(result).toBe(4);
    });

    it(`should return 3 for a value of 95`, () => {
        const result = getNormalPBoundaryExponent({
            PLength: 95
        });
        expect(result).toBe(3);
    });

});
