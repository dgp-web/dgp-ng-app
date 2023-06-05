import { defaultProbabilityChartPMin } from "../../../constants";
import { getProbabilityChartPMin } from "../get-probability-chart-p-min.function";

describe("getProbabilityChartPMin", () => {

    const defaultPMin = defaultProbabilityChartPMin;

    it(`should return defaultProbabilityChartPMin if no payload is passed`, () => {
        const result = getProbabilityChartPMin();
        expect(result).toBe(defaultPMin);
    });

    it(`should return defaultProbabilityChartPMin if no P is passed`, () => {
        const result = getProbabilityChartPMin({});
        expect(result).toBe(defaultPMin);
    });

    it(`should return the min value of P if this value is smaller than defaultProbabilityChartPMin`, () => {
        const P1 = [0.005, 0.01, 0.02, 0.03];

        let result = getProbabilityChartPMin({P: P1});
        expect(result).toBe(0.005);

        const P2 = [0.02, 0.03];

        result = getProbabilityChartPMin({P: P2});
        expect(result).toBe(defaultPMin);
    });

});
