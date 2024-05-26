import { defaultProbabilityChartPMax } from "../../../constants";
import { getNormalPMax } from "../get-normal-p-max.function";

describe("getNormalChartPMax", () => {

    const defaultPMax = defaultProbabilityChartPMax;

    it(`should return defaultProbabilityChartPMax if no payload is passed`, () => {
        const result = getNormalPMax();
        expect(result).toBe(defaultPMax);
    });

    it(`should return defaultProbabilityChartPMax if no P is passed`, () => {
        const result = getNormalPMax({});
        expect(result).toBe(defaultPMax);
    });

});
