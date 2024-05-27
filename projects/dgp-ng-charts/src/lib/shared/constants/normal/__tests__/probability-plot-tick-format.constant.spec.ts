import { probabilityPlotTickFormat } from "../probability-plot-tick-format.constant";

describe("probabilityPlotTickFormat", () => {

    const format = probabilityPlotTickFormat;

    it(`should return "00000.1" for 00000.1`, () => {
        expect(format(0.00001)).toBe("0.00001");
    });

    it(`should return "0000.1" for 0000.1`, () => {
        expect(format(0.0001)).toBe("0.0001");
    });

    it(`should return "000.1" for 000.1`, () => {
        expect(format(0.001)).toBe("0.001");
    });

    it(`should return "00.1" for 00.1`, () => {
        expect(format(0.01)).toBe("0.01");
    });

    it(`should return "0.1" for 0.1`, () => {
        expect(format(0.1)).toBe("0.1");
    });

    it(`should return "1" for 1`, () => {
        expect(format(1)).toBe("1");
    });

    it(`should return "50" for 50`, () => {
        expect(format(50)).toBe("50");
    });

    it(`should return "99" for 99`, () => {
        expect(format(99)).toBe("99");
    });

    it(`should return "99.9" for 99.9`, () => {
        expect(format(99.9)).toBe("99.9");
    });

    it(`should return "99.99" for 99.99`, () => {
        expect(format(99.99)).toBe("99.99");
    });

    it(`should return "99.999" for 99.999`, () => {
        expect(format(99.999)).toBe("99.999");
    });

    it(`should return "99.9999" for 99.9999`, () => {
        expect(format(99.9999)).toBe("99.9999");
    });

    it(`should return "99.99999" for 99.99999`, () => {
        expect(format(99.99999)).toBe("99.99999");
    });

});
