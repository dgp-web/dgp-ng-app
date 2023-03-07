import {
    connectedScatterPlotMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/connected-scatter-plot-metadata.constant";

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
