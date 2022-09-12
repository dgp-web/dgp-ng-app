import { defaultConnectedScatterPlotConfig } from "dgp-ng-charts";

describe("defaultConnectedScatterPlotConfig", () => {

    const config = defaultConnectedScatterPlotConfig;

    it(`should have refTickCharWidth 10`, () => {
        expect(config.refTickCharWidth).toBe(10);
    });

});
