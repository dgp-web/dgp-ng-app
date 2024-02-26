import { getProbabilityChartPBoundaryExponent } from "../get-probability-chart-p-boundary-exponent.function";

describe("getProbabilityChartPBoundaryExponent", () => {

    it(`should return 4 for a value of 121`, () => {
        const result = getProbabilityChartPBoundaryExponent({
            PLength: 121
        });
        expect(result).toBe(4);
    });

    it(`should return 3 for a value of 95`, () => {
        const result = getProbabilityChartPBoundaryExponent({
            PLength: 95
        });
        expect(result).toBe(3);
    });

});
