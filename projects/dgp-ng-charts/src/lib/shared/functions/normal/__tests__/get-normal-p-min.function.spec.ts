import { defaultProbabilityChartPMin } from "../../../constants";
import { getNormalPMin } from "../get-normal-p-min.function";

describe("getNormalPMin", () => {

    const defaultPMin = defaultProbabilityChartPMin;

    it(`should return defaultProbabilityChartPMin if no payload is passed`, () => {
        const result = getNormalPMin();
        expect(result).toBe(defaultPMin);
    });

    it(`should return defaultProbabilityChartPMin if no P is passed`, () => {
        const result = getNormalPMin({});
        expect(result).toBe(defaultPMin);
    });

});
