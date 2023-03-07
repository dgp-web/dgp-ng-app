import { connectedScatterPlotMetadata } from "../connected-scatter-plot-metadata.constant";

describe("connectedScatterPlotMetadata", () => {

    const metadata = connectedScatterPlotMetadata;

    describe(`lineWidth`, () => {

        const lineWidth = metadata.attributes.lineWidth;

        it(`should not be required`, () => {
            expect(lineWidth.isRequired).toBeFalsy();
        });

        it(`should have defaultValue 1.5`, () => {
            expect(lineWidth.defaultValue).toBe(1.5);
        });

    });

});
