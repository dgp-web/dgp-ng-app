import { defaultProbabilityChartPMax } from "../../../constants";
import { getProbabilityChartPMax } from "../get-probability-chart-p-max.function";

describe("getProbabilityChartPMax", () => {

    const defaultPMax = defaultProbabilityChartPMax;

    it(`should return defaultProbabilityChartPMax if no payload is passed`, () => {
        const result = getProbabilityChartPMax();
        expect(result).toBe(defaultPMax);
    });

    it(`should return defaultProbabilityChartPMax if no P is passed`, () => {
        const result = getProbabilityChartPMax({});
        expect(result).toBe(defaultPMax);
    });

    it(`should return the max value of P if this value is larger than defaultProbabilityChartPMax`, () => {
        const P1 = [0.97, 0.98, 0.99, 0.991];

        let result = getProbabilityChartPMax({P: P1});
        expect(result).toBe(0.991);

        const P2 = [0.97, 0.98];

        result = getProbabilityChartPMax({P: P2});
        expect(result).toBe(defaultPMax);
    });

});
